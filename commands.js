const huejay = require("huejay");
const fs = require("fs");
const colourDB = require("./db/colour.json");
const dpPath = "./db/db.json"
const db = require(dpPath);

// Real Client
let client = new huejay.Client({
	host:     db.bridgeIP,
	port:     80,               
	username: db.username,
	timeout:  5000,   
});


// Helper Functions

// Updates db.json
function jsonUpdate(){
	fs.writeFile(dpPath, JSON.stringify(db, null, 2), (err) => {
		if(err) {
			return console.log(err);
		}
	});
}

// Exported Functions

function colorChange(id, reqColour){
	console.log(reqColour);
	let colour = colourDB[reqColour];
	console.log(colour);
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

async function getData() {
	// Discover your bridge
	await huejay.discover()
		.then(bridges => {
			bridges.forEach(bridge => {
				console.log(`Bridge Id: ${bridge.id}, Bridge IP: ${bridge.ip}`);
				db.bridgeIP = bridge.ip;
				jsonUpdate();
			});
		})
		.catch(error => {
			console.log(`Error: ${error.message}`);
		});
	console.log("Dont forget the press your button on the bridge.");
}

function createUser() {
	if(db.username === "") {
		// Creates the client
		let client = new huejay.Client({
			host:     db.bridgeIP,
			port:     80,
			username: "", 
			timeout:  15000,
		});
		// Creates the username
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
			}
		);
	}
}


module.exports = { getData, createUser, colorChange }