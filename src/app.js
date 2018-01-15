// Reqs.
const change = require("./hue.js");
const colourDB = require("../db/colour.json");

const commands = {
    "hello": function() { 
        console.log("Hello world!"); 
    },
    "normal light": function() { 
        console.log("normal");
        change.colorChange(1, colourDB.normal) 
    },
    "blue light": function() { 
        console.log("blue");
        change.colorChange(1, colourDB.blue) 
    },
    "red light": function() { 
        console.log("red");
        change.colorChange(1, colourDB.red) 
    }
};
    
// Add our commands to annyang
annyang.addCommands(commands);
annyang.setLanguage("en-US")
annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
    console.log(userSaid); // sample output: 'hello'
    console.log(commandText); // sample output: 'hello (there)'
    console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
});

start = function (){
    console.log("start")
    annyang.start();
}

pause = function (){
    console.log("pause")
    annyang.pause();
}

resume = function (){
    console.log("resume")
    annyang.resume();
}

tryy = function (){
    return "works";
}