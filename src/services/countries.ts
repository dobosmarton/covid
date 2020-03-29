import fetch from "isomorphic-unfetch";

export const getCountries = async () => {
  try {
    const result = await fetch(
      "https://cors-anywhere.herokuapp.com/https://github.com/google/dspl/blob/master/samples/google/canonical/countries.csv"
    );
    console.log("result", result);

    return result.json();
  } catch (error) {
    console.log("getCountries#error", error.message);
  }
};
