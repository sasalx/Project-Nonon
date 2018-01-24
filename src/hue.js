// Reqs.
const huejay = require("huejay");
const db = require("../db/db.json");

// Creates real client that will be used for everything
let client = new huejay.Client({
    host:     db.bridgeIP,
    port:     80,               
    username: db.username,
    timeout:  5000,   
});

function colorChange(id, colour){
    client.lights.getById(id)
    .then(light => {
        light.name = colour;
        light.brightness = colour.brightness;
        light.hue = colour.hue;
        light.saturation = colour.saturation
        light.faded_brightness = colour.faded_brightness;
    
        return client.lights.save(light);
      })
      .then(light => {
        console.log(`Updated light [${light.id}] to colour [${light.hue}]`);
      })
      .catch(error => {
        console.log('Something went wrong');
        console.log(error.stack);
      });
}

module.exports = {
    colorChange: colorChange
}