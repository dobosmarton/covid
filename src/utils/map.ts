import { range } from 'd3-array';
import { scaleQuantile } from 'd3-scale';

export const getCountryNames = (featureCollection) => {
  const { features } = featureCollection;
  return features.map((f) => f.properties.name);
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

  const getValue = (f, value, actFilter) => {
    switch (actFilter) {
      case 'confirmed':
        return value?.confirmed / f.properties.pop_est;
      case 'deaths':
        return value ? value.deaths / value.confirmed : null;
      case 'recovered':
        return value ? value.recovered / value.confirmed : null;
      case 'growthRate':
        return value?.growthRate;
      default:
        return 0;
    }
  };

  const mappedItems = features
    .map((f) => {
      const value = accessor(f);
      return getValue(f, value, filter);
    })
    .filter((item) => item);

  const scale = scaleQuantile().domain(mappedItems).range(range(8));

  return {
    type: 'FeatureCollection',
    filter,
    quantiles: scale.quantiles(),
    features: features.map((f) => {
      const value = accessor(f);

      const rate = getValue(f, value, filter);

      const properties = {
        ...f.properties,
        ...value,
        value: value?.[filter],
        percentile: scale(rate),
      };
      return { ...f, properties };
    }),
  };
};
