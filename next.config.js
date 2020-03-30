import path from 'path';

import withPlugins from 'next-compose-plugins';

import withCustomBabelConfig from 'next-plugin-custom-babel-config';

const getEnvPath = () => {
  switch (process.env.ENV_VARS) {
    case 'development':
      return '.env';
    default:
      return '.env';
  }
};
require('dotenv').config({ path: getEnvPath() });

const env = {
  MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
  WEB_PAGE: process.env.WEB_PAGE,
  GITHUB_PAGE: process.env.GITHUB_PAGE,
  ANALYTICS_ID: process.env.ANALYTICS_ID,
};

const plugins = [[withCustomBabelConfig, { babelConfigFile: path.resolve('./babel.config.js') }]];

const config = {
  env,
  reactStrictMode: true,
  generateInDevMode: true,
  transformManifest: manifest => ['/'].concat(manifest),
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};

module.exports = withPlugins(plugins, config);
