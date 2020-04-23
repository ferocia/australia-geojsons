"use strict";

import turf from "@turf/turf";

import * as fs from "fs";

// read all geojson data
let state = "act";
let filename = state + "-2-clean";
let rawdata = fs.readFileSync(
  "inputs/territories-clean/" + filename + ".geojson"
);
let geojson = JSON.parse(rawdata);


let postcodes = {};
for(let i = 0; i < geojson.features.length; i++) {
  let suburbData = geojson.features[i];
  if(suburbData.properties.postcode.length === 0) continue;

  if (!postcodes.hasOwnProperty(suburbData.properties.postcode)) 
    postcodes[suburbData.properties.postcode] = [];
  let polygon = turf.polygon(suburbData.geometry.coordinates, 
    { 
      postcode: suburbData.properties.postcode,
      suburb: suburbData.properties.suburb
    });
  postcodes[suburbData.properties.postcode].push(polygon);
}

// dissolve by postcode
let postcodeAreas = [];
for(let postcode in postcodes) {
  if(postcode == "2602") continue
  try {
    postcodeAreas.push(turf.union(...postcodes[postcode]));
  } catch(error) {
    console.log(error);
  }
  
}
console.log(postcodeAreas.length);

// write to file