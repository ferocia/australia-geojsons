'use strict';

const csv = require('csv-parser');
const fs = require('fs');

let input_path = 'inputs/';

// read all geojson data
let state = 'wa';
let filename = state + '-2';
let rawdata = fs.readFileSync(input_path + 'territories/' + filename + '.json');
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
      let suburbName = geojson.features[i].properties[state + '_local_2'];
      // console.log(suburbName);
      let suburbData = getSuburb(state.toUpperCase(), suburbName);
      geojson.features[i].properties = {};
      geojson.features[i].properties.state = state.toUpperCase();
      geojson.features[i].properties.postcode = suburbData == undefined ? '' : suburbData.postcode;
      geojson.features[i].properties.suburb = suburbName;
      
      fs.writeFileSync(input_path + 'territories/' + filename + '-clean.geojson', JSON.stringify(geojson));
    }

  });


