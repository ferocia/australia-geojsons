'use strict';

const csv = require('csv-parser');
const fs = require('fs');

// read all geojson data
let rawdata = fs.readFileSync('territories/act.geojson');
let geojson = JSON.parse(rawdata);
console.log(geojson);

// let areas = [];
// fs.createReadStream('postcode-dataout.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     areas.push(row);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//   });