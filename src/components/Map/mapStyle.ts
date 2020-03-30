// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'percentile',
      stops: [
        '#00429d',
        '#4771b2',
        '#73a2c6',
        '#a5d5d8',
        '#ffbcaf',
        '#f4777f',
        '#cf3759',
        '#93003a',
      ].map((color, index) => [index, color]),
    },
    'fill-opacity': 0.8,
  },
};

export default {};
