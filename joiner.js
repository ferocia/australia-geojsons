'use strict';

const fs = require('fs');
//requiring path and fs modules
const path = require('path');

// read all geojson data
let folder = 'territories/';

//joining path of directory 
const directoryPath = path.join(__dirname, folder);

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  let all_suburbs = {
    type: 'FeatureCollection',
    features: []
  }

  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    let rawdata = fs.readFileSync(folder + file);
    let geojson = JSON.parse(rawdata);
    
    all_suburbs.features = all_suburbs.features.concat(geojson.features);
    console.log(all_suburbs.features.length);
  });

  
});



