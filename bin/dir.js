"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkDir = exports.isDir = exports.emptyDir = exports.copyDir = void 0;
var tslib_1 = require("tslib");
// import * as ncp from 'ncp';
var ncp = require("ncp");
var fs = tslib_1.__importStar(require("fs"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var path = tslib_1.__importStar(require("path"));
var copyDir = function (sourcePath, destPath) {
    ncp(sourcePath, destPath);
};
exports.copyDir = copyDir;
var emptyDir = function (filePath) {
    if (!fs.existsSync(filePath))
        return console.log("".concat(chalk_1.default.green(' warning: the path is not existing')));
    if ((0, exports.isDir)(filePath)) {
        var files = fs.readdirSync(filePath);
        files.forEach(function (file) {
            var curPath = path.join(filePath, file);
            if ((0, exports.isDir)(curPath)) {
                (0, exports.emptyDir)(curPath);
            }
            else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(filePath); // 删除空白文件夹
    }
    // unlink: for file
};
exports.emptyDir = emptyDir;
var isDir = function (filePath) {
    if (fs.existsSync(filePath)) {
        return fs.statSync(filePath).isDirectory();
    }
    return false;
};
exports.isDir = isDir;
var mkDir = function (filePath) {
    if (fs.existsSync(filePath))
        return console.log("".concat(chalk_1.default.green(' warning: the file already exists')));
    fs.mkdirSync(filePath);
};
exports.mkDir = mkDir;
