// Reqs.
const change = require("./hue.js");

const normal = {
    "brightness": 191,
    "hue": 41442,
    "saturation": 75,
    "faded_brightness": 190
  }

const commands = {
    'hello': function() { 
        console.log("Hello world!"); 
    },
    'normal': function() { 
        console.log("normal");
        change.colorChange(1, normal) 
    }
};
    
// Add our commands to annyang
annyang.addCommands(commands);

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