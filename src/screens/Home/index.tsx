import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import MapGL from "react-map-gl";
import { format, subDays } from "date-fns";

import { TIME_SERIES, COUNTRIES } from "../../graphql/queries";
import { TimeSeriesData, TimeSeriesVars } from "../../config/interfaces";
import { getCountryNames } from "../../utils/map";
import {
  CovidDataProvider,
  CovidDataContext
} from "../../context/CovidContext";
import MapView from "../../components/Map";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { getCountries } from "../../services/countries";
import { fetcher } from "../../services/index";

const defaultViewport = {
  latitude: 39.31196974678444,
  longitude: 17.170312499999365,
  zoom: 2,
  bearing: 0,
  pitch: 0
};

type Props = {};

const Home = ({}: Props) => {
  const [viewport, setViewport] = useState(defaultViewport);

  // console.log("countries", resCountries);

  const countries = ["Hungary"];

  const date = format(subDays(new Date(), 1), "dd/MM/yyyy");

  console.log("date", date);

  const { loading, error, data, sourceData } = useContext(CovidDataContext);

  /*const { loading, error, data } = useQuery<TimeSeriesData, TimeSeriesVars>(
    TIME_SERIES,
    {
      variables: { date },
      skip: !countries
    }
  );*/

  /*const { loading, error, data } = useQuery<TimeSeriesData, TimeSeriesVars>(
    COUNTRIES,
    {
      variables: { names: countries },
      skip: !countries
    }
  );*/

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log("Home", sourceData);

  return (
    <>
      <Header />
      <MapView
        {...viewport}
        sourceData={sourceData}
        onViewportChange={setViewport}
      />
      <Footer countries={sourceData?.features} />
    </>
  );
};

export default Home;
