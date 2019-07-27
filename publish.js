var RegClient = require("npm-registry-client");
var client = new RegClient(require("./package.json"));
const uri = "https://registry.npmjs.org/npm";
// var params = { timeout: 1000 };
//
// client.publish(
//     uri,
//     {
//         metadata: require("./package.json"),
//         access: "restricted",
//         body: "",
//         auth: { token: "39475131-bc37-4d4f-af85-adec0003f1a3", alwaysAuth: false }
//     },
//     function(error, data, raw, res) {
//         console.warn("-- Console dat", data);
//         // error is an error if there was a problem.
//         // data is the parsed data object
//         // raw is the json string
//         // res is the response from couch
//     }
// );
const path = require("path");
const fs = require("fs");
// const RegClient = require("npm-registry-client");
// const commandLineArgs = require("command-line-args");

// const client = new RegClient({});
// const optionDefinitions = [
//     { name: "registry", alias: "r", type: String },
//     { name: "username", alias: "u", type: String },
//     { name: "password", alias: "p", type: String },
//     { name: "email", alias: "e", type: String }
// ];

// const cmdArgs = commandLineArgs(optionDefinitions);
// const uri = cmdArgs.registry;
const auth = {
    token: "39475131-bc37-4d4f-af85-adec0003f1a3",
    alwaysAuth: false
};

function runPublish() {
    const packagePath = path.resolve(__dirname, `package.json`);
    const pkg = require(packagePath);
    const bodyPath = require.resolve(packagePath);
    const tarball = fs.createReadStream(bodyPath);
    console.warn("-- Console t", tarball);
    const params = {
        metadata: pkg,
        access: "public",
        body: tarball,
        auth: auth
    };
    client.publish(uri, params, function(error) {
        if (error) {
            throw error;
        }
        console.info(`Package ${pkg.name} v ${pkg.version}`);
    });
}

runPublish();
