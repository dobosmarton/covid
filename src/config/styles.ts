import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    primary: "#40BFC1",
    white: "#ffffff",
    yellow: "#ffd082",
    blue: "#285c85",
    darkBlue: "#204969",
    superLightGrey: "#f1f3f4",
    lightGrey: "#dadada",
    grey: "#69779b",
    dark: "#323232"
  }
};

export const GlobalStyle = createGlobalStyle`
  body {
    letter-spacing: 1px;
    line-height: 1.5em;
  }
`;
