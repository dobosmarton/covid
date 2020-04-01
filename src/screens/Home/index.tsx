import { useState, useContext, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';

import { FlyToInterpolator } from 'react-map-gl';

import { CovidDataContext } from '../../context/CovidContext';
import MapView from '../../components/Map';
import Header from '../../components/header';
import Footer from '../../components/footer';

const defaultViewport = {
  latitude: 39.31196974678444,
  longitude: 17.170312499999365,
  zoom: 2,
};

type Props = {};

const Home = () => {
  const [viewport, setViewport] = useState(defaultViewport);
  const [isPageLoading, setPageLoading] = useState(true);

  const { error, sourceData } = useContext(CovidDataContext);

  useEffect(() => {
    setPageLoading(false);
  }, []);

  const onViewportChange = useCallback(
    ({ latitude, longitude }) => {
      setViewport((view) => ({
        ...view,
        latitude,
        longitude,
        zoom: 3,
        transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
        transitionDuration: 'auto',
      }));
    },
    [setViewport]
  );

  if (error) return <p>Error :(</p>;

  return (
    <>
      <NextSeo
        openGraph={{
          type: 'website',
          url: 'https://www.covidinspector.com',
          title: 'Coronavirus data map',
          description: 'Region distribution of coronavirus confirmed, deaths, recovered and growth rate data.',
        }}
      />
      {!isPageLoading && <Header />}

      <MapView viewport={viewport} sourceData={sourceData} onViewportChange={setViewport} />
      <Footer onViewportChange={onViewportChange} />
    </>
  );
};

export default Home;
