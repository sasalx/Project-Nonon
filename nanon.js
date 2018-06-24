#!/usr/bin/env node
'use strict';

const consoler = require("commander");
const { getData } = require("./commands");

// Main Section

consoler
	.version('0.2.0')
	.description('Philips Hue colour control system via voice input.')

// Sub Commands

consoler
  .command('getdata')
  .alias('gd')
  .description('Gets your network data which is needed for app.')
  .action( () => {
    getData();
  });


consoler.parse(process.argv);


