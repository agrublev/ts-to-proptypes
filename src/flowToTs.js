const convert = require("./flowToTypescript/convert.js");
const fs = require("fs");
const flowToJs = async file => {
    let template = fs.readFileSync(file, "utf8");
    const co = convert(template);
    let replaceExt = file.split(".");
    replaceExt[replaceExt.length - 1] = "ts";
    replaceExt = replaceExt.join(".");
    await fs.writeFileSync(`${replaceExt}`, co.replace(/\/\* /g, "/** "));
    return replaceExt;
};
module.exports = flowToJs;
