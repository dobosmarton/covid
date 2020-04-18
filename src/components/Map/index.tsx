import MapGL, { Source, Layer } from 'react-map-gl';
import { dataLayer } from './mapStyle';
import Legend from './legend';
import Switcher from '../switcher';

type ViewPort = {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing?: number;
  pitch?: number;
};

type Props = {
  viewport: ViewPort;
  sourceData: {
    filter: string;
    features: any[];
    quantiles?: number[];
  };
  onViewportChange: (viewport: ViewPort) => void;
};

const Map = ({ viewport, sourceData, onViewportChange }: Props) => {
  console.log('sourceData', sourceData);

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/light-v10"
      onViewportChange={onViewportChange}
      mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
    >
      <Source type="geojson" data={sourceData}>
        <Layer {...dataLayer} />
      </Source>
      <Switcher />
      <Legend
        filter={sourceData?.filter}
        quantiles={sourceData?.quantiles}
        stops={dataLayer.paint['fill-color'].stops}
      />
    </MapGL>
  );
};

export default Map;
