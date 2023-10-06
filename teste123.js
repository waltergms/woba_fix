const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');

const jsonStream = StreamArray.withParser();

//internal Node readable stream option, pipe to stream-json to convert it for us
fs.createReadStream('./src/database/csv/yelp_database.json').pipe(
  jsonStream.input,
);

//You'll get json objects here
//Key is the array-index here
jsonStream.on('data', ({ key, value }) => {
  console.log(key, value);
});

jsonStream.on('end', ({ key, value }) => {
  console.log('All Done');
});
