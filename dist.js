#!/usr/bin/env node
const main = require("./dist/index.js");
const argv = require("yargs").argv;

main.run(argv);
