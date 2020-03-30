import { gql } from 'apollo-server-micro';

const schema = gql`
  type MapDataPoint {
    country: String
    latitude: Float
    longitude: Float
    name: String
  }

  type Country {
    name: String
    results: [Result]
    mostRecent: Result
    mapData: MapDataPoint
  }
  type Result {
    country: Country
    date(format: String): String
    confirmed: Int
    deaths: Int
    recovered: Int
    growthRate: Float
  }

  input DateInput {
    eq: String
    gt: String
    lt: String
  }
  type Query {
    result(country: String!, date: DateInput): [Result]
    countries(names: [String]): [Country]
  }
`;

export default schema;
