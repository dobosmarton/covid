import { range } from "d3-array";
import { scaleQuantile } from "d3-scale";

export const getCountryNames = featureCollection => {
  const { features } = featureCollection;
  return features.map(f => f.properties.name);
};

export const convertCountryArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item.mostRecent
    };
  }, initialValue);
};

export const updatePercentiles = (
  featureCollection,
  accessor,
  filter = "confirmed"
) => {
  const { features } = featureCollection;
  const scale = scaleQuantile()
    .domain(features.map(accessor).map(item => item?.[filter]))
    .range(range(12));

  return {
    type: "FeatureCollection",
    quantiles: scale.quantiles(),
    features: features.map(f => {
      const value = accessor(f);

      const properties = {
        ...f.properties,
        ...value,
        value: value?.[filter],
        percentile: scale(value?.[filter])
      };
      return { ...f, properties };
    })
  };
};
