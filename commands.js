const huejay = require("huejay");
const fs = require("fs");
const dpPath = "./db/db.json"
const db = require(dpPath);

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

module.exports = { getData }