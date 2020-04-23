'use strict';

const fs = require('fs');
let filePath = 'outputs/au-postcodes-Visvalingam-5';
let rawdata = fs.readFileSync(filePath + '.geojson');
let geojson = JSON.parse(rawdata);

for(let i = 0; i < geojson.features.length; i++) {
  let postalArea = geojson.features[i];
  if(Object.keys(postalArea.properties).length !== 3 || 
      !postalArea.properties.hasOwnProperty("POA_CODE") || 
      !postalArea.properties.hasOwnProperty("POA_NAME") || 
      !postalArea.properties.hasOwnProperty("SQKM")) {
    console.log("something is wrong here");
  }
}

fs.writeFileSync(filePath + '.min.geojson', JSON.stringify(geojson));