import 'typeface-nunito-sans';

import React from 'react';
import NextApp from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'styled-components';

import { TypographyStyle } from 'react-typography';
import { ApolloProvider } from '@apollo/client';
import { CovidDataProvider } from '../src/context/CovidContext';
import { SearchProvider } from '../src/context/SearchContext';

import client from '../src/config/apollo';
import typography from '../src/config/typography';
import { theme, GlobalStyle } from '../src/config/styles';

import SEO from '../next-seo.config';

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <DefaultSeo {...SEO} />
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ApolloProvider client={client}>
            <SearchProvider>
              <CovidDataProvider>
                <TypographyStyle typography={typography} />
                <Component {...pageProps} />
              </CovidDataProvider>
            </SearchProvider>
          </ApolloProvider>
        </ThemeProvider>
      </>
    );
  }
}
