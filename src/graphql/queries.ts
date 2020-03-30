import { gql } from "@apollo/client";

export const TIME_SERIE = gql`
  query Result($country: String!, $date: String!) {
    result(country: $country, date: { lt: $date }) {
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
