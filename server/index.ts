import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro';
import Cors from 'micro-cors';
import fetch from 'isomorphic-unfetch';
import typeDefs from './schema';

import resolvers from './resolvers';

const cors = Cors({
  allowMethods: ['GET', 'POST', 'OPTIONS'],
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

let timeSeriesData = null;
let countryMapData = null;

const apolloServer = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: () => {
    const getTimeseries = async () => {
      if (timeSeriesData) {
        return timeSeriesData;
      }
      const res = await fetch('https://pomber.github.io/covid19/timeseries.json');
      timeSeriesData = await res.json();
      return timeSeriesData;
    };

    const getCountryData = async () => {
      if (countryMapData) {
        return countryMapData;
      }

      const res = await fetch('https://restcountries.eu/rest/v2/all');
      const countries = await res.json();

      // console.log('res', res, countries);

      countryMapData = countries.map(country => ({
        ...country,
        latitude: country.latlng[0],
        longitude: country.latlng[1],
      }));

      return countryMapData;
    };
    return { getCountryData, getTimeseries };
  },
});

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

console.log('Start server');

export default cors((req, res) => (req.method === 'OPTIONS' ? res.end() : handler(req, res)));
