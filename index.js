'use strict';

const csv = require('csv-parser');
const fs = require('fs');

let input_path = 'inputs/';

// read all geojson data
let rawdata = fs.readFileSync(input_path + 'territories/act.geojson');
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
      let suburbName = geojson.features[i].properties['act_loca_2'];
      // console.log(getSuburb('ACT', suburbName));
      if(getSuburb('ACT', suburbName) == undefined) {
        console.log('ACT', suburbName);
      }
      
      // geojson.features[i].properties.postcode = 
      // geojson.features[i].properties.state = 
    }

  });


