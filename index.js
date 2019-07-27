#!/usr/bin/env node
const main = require("./src/index.js");

const argv = require("yargs").argv;
(async () => {
    main.run(argv);
})();
