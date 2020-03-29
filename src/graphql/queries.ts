import { gql } from "@apollo/client";

export const TIME_SERIES = gql`
  query Results($countries: [String!]!, $date: String!) {
    results(countries: $countries, date: { lt: $date }) {
      country {
        name
      }
      date
      confirmed
      deaths
      recovered
      growthRate
    }
  }
`;

export const COUNTRIES = gql`
  query Countries($names: [String!]!) {
    countries(names: $names) {
      name
      mapData {
        longitude
        latitude
      }
      mostRecent {
        confirmed
        deaths
        recovered
        growthRate
        date
      }
    }
  }
`;
