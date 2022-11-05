"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateURL = exports.templateDefault = exports.version = void 0;
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
exports.version = require('../package.json').version;
exports.templateDefault = [
    {
        name: "Default ".concat(chalk_1.default.yellow('Vue2')),
        value: 'Vue2'
    },
    {
        name: "Default ".concat(chalk_1.default.white('Vue3')),
        value: 'Vue3'
    },
    {
        name: "Default ".concat(chalk_1.default.green('React')),
        value: 'React',
        disabled: "\u52A0\u6025\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85..."
    }
];
exports.templateURL = 'https://github.com/heD0ng/electron-learn.git';
// module.exports = {
//     version,
//     templateDefault
// }
exports.default = {
    version: exports.version,
    templateDefault: exports.templateDefault
};
