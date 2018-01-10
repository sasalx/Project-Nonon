// Reqs.
const huejay = require("huejay");
const fs = require("fs");
const dpPath = "./db.json"
const db = require(dpPath);

// Creates the client
let client = new huejay.Client({
    host:     db.bridgeIP,
    port:     80,               // Optional
    username: "", // Optional
    timeout:  15000,            // Optional, timeout in milliseconds (15000 is the default)
});

// Creates the username
// NOTE: This is a must for functionality
if(client.username === "") {
    let user = new client.users.User;
    user.deviceType = 'my_device_type';

    client.users.create(user)
    .then(user => {
        console.log(`Username: ${user.username}`);
        db.username = user.username;
        jsonUpdate();
    })
    .catch(error => {
        if (error instanceof huejay.Error && error.type === 101) {
        return console.log(`Link button not pressed. Try again...`);
        }

        console.log(error.stack);
    });
}

// Updates db.json
function jsonUpdate(){
    fs.writeFile(dpPath, JSON.stringify(db, null, 2), function (err) {
      if(err) {
        return console.log(err);
      }
      console.log(JSON.stringify(db));
    });
}