'use strict';

const csv = require('csv-parser');
const fs = require('fs');

let input_path = 'inputs/';

// read all geojson data
let state = 'vic';
let filename = state + '-5'; // this is to read from 5% accurate file
let rawdata = fs.readFileSync(input_path + 'territories/' + filename + '.geojson');
let geojson = JSON.parse(rawdata);

// read csv suburbs data
let areas = [];
fs.createReadStream(input_path + 'postcode-dataout.csv')
  .pipe(csv())
  .on('data', (row) => {
    areas.push(row);
  })
  .on('end', () => {

    function getSuburb(state, suburbName){
      let found_suburb = areas.find(function(area) {
        return area.state == state && area.suburb == suburbName;
      });

      return found_suburb;
    }

    for(let i = 0; i < geojson.features.length; i++) {
      let suburbName = geojson.features[i].properties[state + '_loca_2'];
      // console.log(suburbName);
      let suburbData = getSuburb(state.toUpperCase(), suburbName);
      geojson.features[i].properties = {};
      geojson.features[i].properties.state = state.toUpperCase();
      geojson.features[i].properties.suburb = suburbName;
      geojson.features[i].properties.postcode = suburbData == undefined ? '' : suburbData.postcode;
      if(suburbData == undefined ) {
        console.log("Couldn't find postcode for suburb:", suburbName);
      }
    }

    fs.writeFileSync(input_path + 'territories/' + filename + '-clean.geojson', JSON.stringify(geojson, null, 2));
  });


