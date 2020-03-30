export type MapDataPoint = {
  country: string;
  latitude: number;
  longitude: number;
  name: string;
};

export type Country = {
  name?: string | null;
  results?: Result[];
  mostRecent?: Result;
  mapData: MapDataPoint;
};

export type Result = {
  country?: Country | null;
  date?: string | null;
  confirmed?: number | null;
  deaths?: number | null;
  recovered?: number | null;
  growthRate?: number | null;
};

export type DateInput = {
  eq?: string;
  gt?: string;
  lt?: string;
};

export type Query = {
  results?: Array<Result>;
  result?: Result;
  countries?: Array<Country>;
  country?: Country;
};

export type QueryResultsArgs = {
  countries?: Array<string>;
  date?: DateInput;
};

export type QueryResultArgs = {
  country: string;
  date?: string;
};

export type QueryCountriesArgs = {
  names?: Array<string>;
};

export type QueryCountryArgs = {
  name?: string;
};

export type ResultDateArgs = {
  format?: string;
};
