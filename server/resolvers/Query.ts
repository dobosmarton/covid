const formatDate = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

const getGrowthRate = (index: number, results: any) => {
  if (index === 0) {
    return 0;
  }
  const prevResult = results[index - 1];
  const currentResult = results[index];
  if (!prevResult || prevResult.confirmed === 0) {
    return undefined;
  }
  return (currentResult.confirmed - prevResult.confirmed) / prevResult.confirmed;
};

const resolvers = {
  async result(_parent, { country, date }, { getTimeseries }) {
    const results = await getTimeseries();
    const countryResults = results[country];

    const withCountryName = countryResults.map((result, index) => ({
      ...result,
      growthRate: getGrowthRate(index, countryResults),
      country: { name: country },
    }));

    if (date) {
      const eq = date && date.eq ? formatDate(new Date(date.eq)) : null;
      const lt = date && date.lt ? new Date(formatDate(new Date(date.lt))) : null;
      const gt = date && date.gt ? new Date(formatDate(new Date(date.gt))) : null;

      return withCountryName.filter(result => {
        const d = new Date(result.date);

        return (eq && formatDate(d) === eq) || (lt && d < lt) || (gt && d > gt) || !date;
      });
    }
    return withCountryName;
  },

  async countries(_parent, { names }, { getTimeseries, getCountryData }) {
    const results = await getTimeseries();
    const countryMapData = await getCountryData();

    const formatted = (names && names.length > 0 ? names : Object.keys(results)).reduce((acc, countryName) => {
      const countryResults = results[countryName] as any[];
      if (!countryResults) {
        // throw new ApolloError(`Couldn't find data from country ${countryName}`);
        return acc;
      }

      const updatedResults = countryResults.map((result, index) => ({
        ...result,
        growthRate: getGrowthRate(index, countryResults),
      }));
      const mostRecentIndex = countryResults.length - 1;
      const mostRecent = countryResults[mostRecentIndex];
      mostRecent.growthRate = getGrowthRate(mostRecentIndex, updatedResults);
      const country = {
        name: countryName,
        results: updatedResults,
        mapData: countryMapData.find(point => {
          return (
            point.name === countryName ||
            point.nativeName === countryName ||
            point.alpha2Code === countryName ||
            point.translations.de === countryName
          );
        }),
        mostRecent,
      };
      return [...acc, country];
    }, []);
    return formatted;
  },
};

export default resolvers;
