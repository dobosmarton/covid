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

export interface CountriesData {
  countries: Country[];
}

export interface CountriesVars {
  names: string[];
}

export interface TimeSeriesData {
  result: DataPoint[];
}

export interface TimeSeriesVars {
  country: string;
  date: string;
}

export type MapDataPoint = {
  country: string;
  latitude: number;
  longitude: number;
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
