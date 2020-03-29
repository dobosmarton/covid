import "typeface-nunito-sans";

import React from "react";
import NextApp from "next/app";
import { ThemeProvider } from "styled-components";
import { TypographyStyle } from "react-typography";
import { ApolloProvider } from "@apollo/client";
import { CovidDataProvider } from "../src/context/CovidContext";

import client from "../src/config/apollo";
import typography from "../src/utils/typography";

const theme = {
  colors: {
    primary: "#40BFC1",
    white: "#ffffff",
    grey: "#69779b"
  }
};

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <CovidDataProvider>
            <TypographyStyle typography={typography} />
            <Component {...pageProps} />
          </CovidDataProvider>
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}
