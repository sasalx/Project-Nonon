// Reqs.
const huejay = require("huejay");
const fs = require("fs");
const dpPath = "./db.json"
const db = require(dpPath);

// Discover your bridge
huejay.discover()
  .then(bridges => {
    for (let bridge of bridges) {
      console.log(`Bridge Id: ${bridge.id}, Bridge IP: ${bridge.ip}`);
      db.bridgeIP = bridge.ip;
      jsonUpdate();
    }
  })
  .catch(error => {
    console.log(`Error: ${error.message}`);
  });

// Updates db.json
function jsonUpdate(){
  fs.writeFile(dpPath, JSON.stringify(db, null, 2), function (err) {
    if(err) {
      return console.log(err);
    }
    console.log(JSON.stringify(db));
  });
}