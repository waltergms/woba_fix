/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const csv = require('csvtojson');
const fs = require('fs');

const csvFilePath = path.join(
  __dirname,
  '../../src/database/csv/yelp_database.csv',
);

const jsonFilePath = path.join(
  __dirname,
  '../../src/database/csv/yelp_database.json',
);

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    console.log(jsonObj);
    fs.writeFile(jsonFilePath, JSON.stringify(jsonObj), (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
