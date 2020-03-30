import { useState, useEffect } from "react";

import MapGL, { Source, Layer } from "react-map-gl";
import { dataLayer } from "./mapStyle";
import { updatePercentiles } from "../../utils/map";
import Legend from "./legend";
import Tooltip from "./tooltip";
import Switcher from "../switcher";

type ViewPort = {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  bearing?: number;
  pitch?: number;
};

type Props = {
  t: (key: string) => void;
  viewport: ViewPort;
  sourceData: {
    type: string;
    features: Array<{}>;
  };
  onViewportChange: (viewport: ViewPort) => void;
};

const Map = ({ viewport, sourceData, onFly, onViewportChange }: Props) => {
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
        quantiles={sourceData?.quantiles}
        stops={dataLayer.paint["fill-color"].stops}
      />
    </MapGL>
  );
};

export default Map;
