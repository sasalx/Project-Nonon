const huejay = require("huejay");
const fs = require("fs");
const colourDB = require("./db/colour.json");
const dpPath = "./db/db.json"
const db = require(dpPath);

// Real Client
let client = new huejay.Client({
	host: db.bridgeIP,
	port: 80,
	username: db.username,
	timeout: 5000,
});


// Helper Functions

// Updates db.json
function jsonUpdate() {
	fs.writeFile(dpPath, JSON.stringify(db, null, 2), (err) => {
		if (err) {
			return console.log(err);
		}
	});
}

// Exported Functions

function colorChange(id, reqColour) {
	let colour = colourDB[reqColour];
	client.lights.getById(id)
		.then(light => {
			console.log(`    X/Y:        ${light.xy[0]}, ${light.xy[1]}`);
			light.name = colour;
			light.brightness = colour.brightness;
			light.xy[0] = colour.xy[0];
			light.xy[1] = colour.xy[1];
			light.saturation = colour.saturation
			light.faded_brightness = colour.faded_brightness;
			return client.lights.save(light);
		})
		.then(light => {
			console.log(`    X/Y:        ${light.xy[0]}, ${light.xy[1]}`);
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
	if (db.username === "") {
		// Creates the client
		let client = new huejay.Client({
			host: db.bridgeIP,
			port: 80,
			username: "",
			timeout: 15000,
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

// From https://github.com/usolved/cie-rgb-converter
function RGB_to_CIE(red, green, blue) {
	//Apply a gamma correction to the RGB values, which makes the color more vivid and more the like the color displayed on the screen of your device
	red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
	green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
	blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);

	//RGB values to XYZ using the Wide RGB D65 conversion formula
	const X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
	const Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
	const Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;

	//Calculate the xy values from the XYZ values
	let x = (X / (X + Y + Z)).toFixed(4);
	let y = (Y / (X + Y + Z)).toFixed(4);

	if (isNaN(x))
		x = 0;

	if (isNaN(y))
		y = 0;


	console.log(`X: ${x} Y: ${y}`)
}


module.exports = { getData, createUser, colorChange, RGB_to_CIE }