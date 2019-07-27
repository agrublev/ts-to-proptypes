#!/usr/bin/env node

const argv = require("yargs").argv;
const convert = require("./flowToTypescript/convert.js");
const fs = require("fs");
let template = fs.readFileSync(argv.file, "utf8");
(async () => {
    const co = convert(template);
    let replaceExt = argv.file.split(".");
    replaceExt[replaceExt.length - 1] = "ts";
    replaceExt = replaceExt.join(".");
    console.warn("-- Console re", replaceExt);
    // co = co.replace(/\/\* /g, "/** ");
    await fs.writeFileSync(`${replaceExt}`, co.replace(/\/\* /g, "/** "));
})();
