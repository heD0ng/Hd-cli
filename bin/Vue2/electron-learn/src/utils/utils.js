"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampToTime = exports.directoryFiles = exports.saveMedia = exports.mkdirDirectory = void 0;
var constant_1 = require("./constant");
var path = window.require('path');
var fs = window.require('fs');
/** 创建目录 */
function mkdirDirectory(pathUrl) {
    return new Promise(function (resolve) {
        if (!fs.existsSync(pathUrl)) {
            var res = fs.mkdirSync(pathUrl, { recursive: true });
            if (res) {
                resolve(true);
            }
        }
        else {
            resolve(true);
        }
    });
}
exports.mkdirDirectory = mkdirDirectory;
/** 保存 */
function saveMedia(blob) {
    return new Promise(function (resolve, reject) {
        var times = new Date().getTime();
        mkdirDirectory(constant_1.VIDEO_PATH).then(function () {
            var localPath = path.join(constant_1.VIDEO_PATH, "".concat(times, ".mp4"));
            var reader = new FileReader();
            reader.onload = function () {
                var buffer = Buffer.from(reader.result);
                fs.writeFile(localPath, buffer, {}, function (err, res) {
                    if (err)
                        return console.error(err);
                });
            };
            reader.onerror = function (err) {
                reject(err);
            };
            reader.readAsArrayBuffer(blob);
            reader.onloadend = function () {
                resolve();
            };
        });
    });
}
exports.saveMedia = saveMedia;
/** 获取指文件列表 */
function directoryFiles() {
    if (!fs.existsSync(constant_1.VIDEO_PATH)) {
        return [];
    }
    var filenames = fs.readdirSync(constant_1.VIDEO_PATH);
    var filts = filenames.filter(function (item) {
        var filePath = path.join(constant_1.VIDEO_PATH, item);
        return fs.statSync(filePath).isFile();
    });
    return filts;
}
exports.directoryFiles = directoryFiles;
/** 时间转换 */
function timestampToTime(timestamp, isMs) {
    if (isMs === void 0) { isMs = false; }
    var intPart = Math.floor(timestamp);
    if (isMs) {
        intPart = Math.floor(timestamp / 1000);
    }
    var h = Math.floor(intPart / 3600) < 10
        ? '0' + Math.floor(intPart / 3600)
        : Math.floor(intPart / 3600);
    var m = Math.floor((intPart / 60) % 60) < 10
        ? '0' + Math.floor((intPart / 60) % 60)
        : Math.floor((intPart / 60) % 60);
    var s = Math.floor(intPart % 60) < 10
        ? '0' + Math.floor(intPart % 60)
        : Math.floor(intPart % 60);
    return "".concat(h, ":").concat(m, ":").concat(s);
}
exports.timestampToTime = timestampToTime;
