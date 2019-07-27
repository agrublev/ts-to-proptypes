#!/usr/bin/env node

const argv = require("yargs").argv;
const convert = require("./src/convert.js");
const fs = require("fs");
let template = fs.readFileSync(argv.file, "utf8");
(async () => {
    const co = convert(template);
    let replaceExt = argv.file.split(".");
    replaceExt.shift();
    replaceExt = replaceExt.join(".") + ".ts";
    await fs.writeFileSync(`${replaceExt}`, co);
})();
