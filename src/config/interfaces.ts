export interface DataPoint {
  country: {
    name: string;
  };
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  growthRate?: number;
}

export interface TimeSeriesData {
  results: DataPoint[];
}

export interface TimeSeriesVars {
  countries: string[];
  date: string;
}

export type MapDataPoint = {
  country: string;
  latitude: float;
  longitude: float;
  name: string;
};

export interface Country {
  name: string;
  mostRecent: Result;
  mapData: MapDataPoint;
}

export interface Result {
  country: Country;
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  growthRate: number;
}
