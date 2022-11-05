"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.screenImg = exports.screenBounds = void 0;
var tslib_1 = require("tslib");
var ipcRenderer = window.require('electron').ipcRenderer;
var screenBounds = function () {
    return new Promise(function (resolve) {
        ipcRenderer.on('transport-bounds', function (event, args) {
            resolve(args);
        });
        ipcRenderer.send('recive-bounds');
    });
};
exports.screenBounds = screenBounds;
var screenImg = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                ipcRenderer.send('recive-desktop');
                ipcRenderer.on('transport-source', function (event, args) {
                    resolve(args);
                });
            })];
    });
}); };
exports.screenImg = screenImg;
