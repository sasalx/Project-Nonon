#!/usr/bin/env node
'use strict';

const consoler = require("commander");
const { getData, createUser, colorChange, RGB_to_CIE } = require("./commands");

// Main Section

consoler
	.version('0.2.0')
	.description('Philips Hue colour control system via voice input.')

// Sub Commands

consoler
	.command('getdata')
	.alias('gd')
	.description('Gets your network data which is needed for app.')
	.action(() => {
		getData();
	});

consoler
	.command('createuser')
	.alias('cu')
	.description('Creates a user for the bridge.')
	.action(() => {
		createUser();
	});

consoler
	.command('change <colour>')
	.alias('ch')
	.description('Changes the colour')
	.action((colour) => {
		colorChange(1, colour);
	});

consoler
	.command('rgbtrans <red> <green> <blue>')
	.alias('rgb')
	.description('Changes the colour')
	.action((red, green, blue) => {
		RGB_to_CIE(red, green, blue)
	});

consoler.parse(process.argv);


