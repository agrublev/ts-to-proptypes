"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __importStar(require("typescript"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Loads and parses a `tsconfig` file and returns a `ts.CompilerOptions` object
 * @param tsConfigPath The location for a `tsconfig.json` file
 */
function loadConfig(tsConfigPath) {
    const { config, error } = ts.readConfigFile(tsConfigPath, filePath => fs_1.default.readFileSync(filePath).toString());
    if (error)
        throw error;
    const { options, errors } = ts.parseJsonConfigFileContent(config, ts.sys, path_1.default.dirname(tsConfigPath));
    if (errors.length > 0)
        throw errors[0];
    return options;
}
exports.loadConfig = loadConfig;
//# sourceMappingURL=config.js.map