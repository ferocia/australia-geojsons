'use strict';

const fs = require('fs');
let filePath = 'inputs/postal_areas_2011/au-postcodes-Visvalingam-5';
let rawdata = fs.readFileSync(filePath + '.geojson');
let geojson = JSON.parse(rawdata);

fs.writeFileSync(filePath + '.min.geojson', JSON.stringify(geojson));