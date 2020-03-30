import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo
} from "react";
import { useQuery } from "@apollo/client";
import { format, subDays } from "date-fns";
import {
  updatePercentiles,
  getCountryNames,
  convertCountryArrayToObject
} from "../utils/map";

import { Country, TimeSeriesData, TimeSeriesVars } from "../config/interfaces";
import { COUNTRIES } from "../graphql/queries";

interface ContextProps {
  readonly loading: boolean;
  readonly error: string | null;
  readonly setActiveFilter: (value: string) => void;
}

export const CovidDataContext = createContext<ContextProps>({
  loading: false,
  error: null,
  data: [],
  sourceData: [],
  setActiveFilter: () => ({})
});

export const CovidDataProvider: React.FC<{}> = ({ children }) => {
  const [sourceData, setSourceData] = useState(null);
  const [activeFilter, setActiveFilter] = useState("confirmed");

  const dataJSON = useRef(require("../../assets/country_layout")).current;
  const countries = useMemo(() => getCountryNames(dataJSON), [dataJSON]);

  const { loading, error, data } = useQuery<TimeSeriesData, TimeSeriesVars>(
    COUNTRIES,
    {
      variables: { names: countries },
      skip: !countries
    }
  );

  useEffect(() => {
    if (data) {
      const convertedData = convertCountryArrayToObject(data.countries, "name");

      const updated = updatePercentiles(
        dataJSON,
        f => convertedData[f.properties.name],
        activeFilter
      );
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
        setActiveFilter
      }}
    >
      {children}
    </CovidDataContext.Provider>
  );
};
