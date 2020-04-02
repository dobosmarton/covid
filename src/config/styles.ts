import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#40BFC1',
    white: '#ffffff',
    yellow: '#ffd082',
    blue: '#285c85',
    darkBlue: '#204969',
    superLightGrey: '#f1f3f4',
    lightGrey: '#dadada',
    grey: '#69779b',
    dark: '#323232',
  },
};

export const GlobalStyle = createGlobalStyle`
 @font-face {
    font-family: Nunito Sans;
    font-weight: 300;
    src: url(/static/fonts/NunitoSans-Light.ttf);
  }
   @font-face {
    font-family: Nunito Sans;
    font-weight: 400;
    src: url(/static/fonts/NunitoSans-Regular.ttf);
  }
   @font-face {
    font-family: Nunito Sans;
    font-weight: 600;
    src: url(/static/fonts/NunitoSans-SemiBold.ttf);
  }
   @font-face {
    font-family: Nunito Sans;
    font-weight: 700;
    src: url(/static/fonts/NunitoSans-Bold.ttf);
  }

  body {
    letter-spacing: 1px;
    line-height: 1.5em;
    font-family: Nunito Sans;
    font-weight: 400;
  }
`;
