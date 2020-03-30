import React, { createContext, useEffect, useState, useRef, useMemo } from 'react';
import { useQuery, ApolloError } from '@apollo/client';
import { updatePercentiles, getCountryNames, convertCountryArrayToObject } from '../utils/map';

import { CountriesData, CountriesVars } from '../config/interfaces';
import { COUNTRIES } from '../graphql/queries';

interface ContextProps {
  readonly loading: boolean;
  readonly error: ApolloError | null;
  readonly sourceData: {
    features: any[];
    quantiles?: number[];
  } | null;
  readonly activeFilter: string;
  readonly setActiveFilter: (value: string) => void;
}

export const CovidDataContext = createContext<ContextProps>({
  loading: false,
  error: null,
  sourceData: null,
  activeFilter: '',
  setActiveFilter: () => ({}),
});

export const CovidDataProvider: React.FC<{}> = ({ children }) => {
  const [sourceData, setSourceData] = useState(null);
  const [activeFilter, setActiveFilter] = useState('confirmed');

  const dataJSON = useRef(require('../../assets/country_layout')).current;
  const countries = useMemo(() => getCountryNames(dataJSON), [dataJSON]);

  const { loading, error, data } = useQuery<CountriesData, CountriesVars>(COUNTRIES, {
    variables: { names: countries },
    skip: !countries,
  });

  useEffect(() => {
    if (data) {
      const convertedData = convertCountryArrayToObject(data.countries, 'name');

      const updated = updatePercentiles(dataJSON, f => convertedData[f.properties.name], activeFilter);
      setSourceData(updated);
    }
  }, [data, activeFilter]);

  return (
    <CovidDataContext.Provider
      value={{
        loading,
        error,
        sourceData,
        activeFilter,
        setActiveFilter,
      }}
    >
      {children}
    </CovidDataContext.Provider>
  );
};
