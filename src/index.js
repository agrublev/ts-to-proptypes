import inquirer from "inquirer";
const { boxInform } = require("./helpers");
inquirer.registerPrompt("directory", require("inquirer-select-directory"));

process.stdout.write("\x1b[2J");
process.stdout.write("\x1b[0f");

const homedir = require("os").homedir() + "/Documents";

const Conf = require("conf");
const config = new Conf({projectName:"FC-TYPES"});
let DirPath = config.get("DirPath", homedir);
const convert = require("./proptype.js");
const flowToTs = require("./flowToTs.js");

export const run = async argv => {
    await boxInform({
        message: "Welcome to the Freedcamp Data Generator",
        secondary: `Sexy`
    });
    const defaultDir = config.get("defaultDir", homedir);

    let dir = defaultDir;
    const convertFlow =
        argv.flow ||
        (await inquire({
            message: "Convert a flow js file?",
            extended: { type: "confirm", default: false }
        }));
    if (convertFlow) {
        dir = await inquire({ message: "Location of flow file", extended: {} });
        dir = await flowToTs(dir);
    } else {
        dir =
            argv.dir ||
            (await inquire({ message: "Directory", extended: { default: defaultDir } }));
        config.set("defaultDir", dir);
    }

    const defaultFrom = config.get("defaultFrom", "@blueprintjs/core");
    const from =
        argv.from ||
        (await inquire({ message: "Import From", extended: { default: defaultFrom } }));
    config.set("defaultFrom", from);

    const example = await inquire({ message: "Example", extended: { type: "editor" } });

    await convert({ dir: dir, from: from, example: example.trim() });
};
const inquire = async ({ message, extended = {} }) => {
    return new Promise(resolve => {
        inquirer
            .prompt([
                {
                    name: "answer",
                    message: message,
                    ...extended
                }
            ])
            .then(async ({ answer }) => {
                resolve(answer);
            });
    });
};
// let aa = await run({ question: "HOW IS IT" });
// if (DirPath !== homedir && !argv.clear) {
// if (dir) {
// } else {
//     if (argv.clear) {
//         config.set("DirPath", homedir);
//     }
//
//     inquirer
//         .prompt([
//             {
//                 type: "directory",
//                 name: "thepath",
//                 options: {
//                     displayFiles: true
//                 },
//                 message: "Where you like to put this component?",
//                 basePath: DirPath
//                 // rootPath: homedir+"/Documents", //path.join(__dirname, "./")
//             }
//         ])
//         .then(async ({ thepath }) => {
//             config.set("DirPath", thepath);
//             console.warn("-- Console the", thepath);
//         });
// }
