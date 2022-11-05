"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateDefault = exports.version = void 0;
var chalk = __importStar(require("chalk"));
exports.version = require('../package.json').version;
console.log(1111);
exports.templateDefault = [
    {
        name: "Default ".concat(chalk.yellow('Vue2')),
        value: 'Vue2'
    },
    {
        name: "Default Vue3",
        value: 'Vue3'
    },
    {
        name: "Default React",
        value: 'React',
        disabled: "'\u52A0\u6025\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85...'"
    }
];
// module.exports = {
//     version,
//     templateDefault
// }
exports.default = {
    version: exports.version,
    templateDefault: exports.templateDefault
};
