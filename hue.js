// Reqs.
const huejay = require("huejay");
const dpPath = "./db.json"
const db = require(dpPath);
const colourDB = require("./colour.json");
const lambID = "1";

// Creates real client that will be used for everything
let client = new huejay.Client({
    host:     db.bridgeIP,
    port:     80,               
    username: db.username,
    timeout:  15000,   
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

colorChange(lambID, colourDB.normal);
setTimeout(function() {
    colorChange(lambID, colourDB.purple);
}, 1500);
setTimeout(function() {
    colorChange(lambID, colourDB.turquoise);
}, 1500*2);
setTimeout(function() {
    colorChange(lambID, colourDB.blue);
}, 1500*3);