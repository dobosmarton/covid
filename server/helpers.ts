import fs from "fs";
import csv from "csv-parser";

export const processCSVFile = path =>
  new Promise((resolve, reject) => {
    const countries = [];
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", data => {
        try {
          const dataPoint = {
            ...data,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude)
          };
          countries.push(dataPoint);
        } catch (err) {
          reject(err);
        }
      })
      .on("end", () => {
        resolve(countries);
      });
  });
