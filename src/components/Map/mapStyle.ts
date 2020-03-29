// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": {
      property: "percentile",
      stops: [
        "#00429d",
        "#3761ab",
        "#5681b9",
        "#73a2c6",
        "#93c4d2",
        "#b9e5dd",
        "#ffd3bf",
        "#ffa59e",
        "#f4777f",
        "#dd4c65",
        "#be214d",
        "#93003a"
      ].map((color, index) => [index, color])
    },
    "fill-opacity": 0.8
  }
};
