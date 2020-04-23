"use strict";

import turf from "@turf/turf";

import * as fs from "fs";

// read all geojson data
let state = "tas";
let filename = state + "-5-clean";
let rawdata = fs.readFileSync(
  "inputs/territories/" + filename + ".geojson"
);
let geojson = JSON.parse(rawdata);


let postcodes = {};
for(let i = 0; i < geojson.features.length; i++) {
  let suburbData = geojson.features[i];
  if(suburbData.properties.postcode.length === 0 || suburbData.properties.postcode !== "7261") continue;

  if (!postcodes.hasOwnProperty(suburbData.properties.postcode)) 
    postcodes[suburbData.properties.postcode] = [];
  let polygon = turf.polygon(suburbData.geometry.coordinates, 
    { 
      postcode: suburbData.properties.postcode
    });
  postcodes[suburbData.properties.postcode].push(polygon);
}

// dissolve by postcode
let postcodeAreas = [];
for(let postcode in postcodes) {
  try {
    postcodeAreas.push(turf.union(...postcodes[postcode]));
  } catch(error) {
    console.log(error);
  }
  
}
console.log(JSON.stringify(postcodeAreas));

// write to file