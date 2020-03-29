import Typography from "typography";

const typography = new Typography({
  headerFontFamily: ["Nunito Sans", "serif"],
  bodyFontFamily: ["Nunito Sans", "sans-serif"]
});

// Insert styles directly into the <head>
typography.injectStyles();

export default typography;
