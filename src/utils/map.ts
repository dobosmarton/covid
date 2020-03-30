import { range } from 'd3-array';
import { scaleQuantile } from 'd3-scale';

export const getCountryNames = featureCollection => {
  const { features } = featureCollection;
  return features.map(f => f.properties.name);
};

export const convertCountryArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: { ...item.mostRecent, ...item.mapData },
    };
  }, initialValue);
};

export const updatePercentiles = (featureCollection, accessor, filter = 'confirmed') => {
  const { features } = featureCollection;

  const mappedItems = features
    .map(accessor)
    .map(item => item?.[filter])
    .filter(item => item);

  const scale = scaleQuantile()
    .domain(mappedItems)
    .range(range(8));

  return {
    type: 'FeatureCollection',
    quantiles: scale.quantiles(),
    features: features.map(f => {
      const value = accessor(f);

      const properties = {
        ...f.properties,
        ...value,
        value: value?.[filter],
        percentile: scale(value?.[filter]),
      };
      return { ...f, properties };
    }),
  };
};
