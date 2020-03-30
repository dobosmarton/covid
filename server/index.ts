import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro';
import getConfig from 'next/config';
import Cors from 'micro-cors';
import fetch from 'isomorphic-unfetch';
import path from 'path';
import typeDefs from './schema';

import { processCSVFile } from './helpers';
import resolvers from './resolvers';

const { serverRuntimeConfig } = getConfig();

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

      countryMapData = await processCSVFile(path.join(serverRuntimeConfig.PROJECT_ROOT, '/assets/countries.csv'));

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

export default cors((req, res) => (req.method === 'OPTIONS' ? res.end() : handler(req, res)));
