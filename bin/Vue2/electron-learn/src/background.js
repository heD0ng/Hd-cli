"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var electron_1 = require("electron");
var launch_1 = tslib_1.__importDefault(require("@/wins/launch"));
var main_1 = tslib_1.__importDefault(require("@/wins/main"));
var ball_1 = tslib_1.__importDefault(require("@/wins/ball"));
var tray_1 = tslib_1.__importDefault(require("@/wins/tray"));
var constant_1 = require("@/utils/constant");
var server_1 = require("@/utils/server");
var path = require('path');
electron_1.protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
]);
var getSize = function () {
    var _a = electron_1.screen.getPrimaryDisplay(), size = _a.size, scaleFactor = _a.scaleFactor;
    return {
        width: size.width * scaleFactor,
        height: size.height * scaleFactor
    };
};
var MainPage;
var SuspendWin;
electron_1.app.on('ready', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var bounds, winW, winH, winWSm, winHSm, ballArc, LaunchPage;
    return tslib_1.__generator(this, function (_a) {
        bounds = electron_1.screen.getPrimaryDisplay().bounds;
        winW = Math.floor((bounds.width / constant_1.BASE_WIN_WIDTH) * constant_1.DESIGN_WIDTH);
        winH = Math.ceil((bounds.height / constant_1.BASE_WIN_HEIGHT) * constant_1.DESIGN_HEIGHT);
        winWSm = Math.floor((bounds.width / constant_1.BASE_WIN_WIDTH) * constant_1.DESIGN_WIDTH_SMALL);
        winHSm = Math.ceil((bounds.height / constant_1.BASE_WIN_HEIGHT) * constant_1.DESIGN_HEIGHT_SMALL);
        ballArc = Math.floor((bounds.width / constant_1.BASE_WIN_WIDTH) * constant_1.DESIGN_ARC_BALL);
        LaunchPage = new launch_1.default({
            width: winWSm,
            height: winHSm
        });
        LaunchPage.on('show', function () {
            console.log('启动页开启');
            (0, server_1.httpServer)(function () {
                console.log('server running');
            });
            SuspendWin = new ball_1.default({
                width: ballArc,
                height: ballArc
            });
            SuspendWin.on('show', function () {
                console.log('小球打开了');
            });
            setTimeout(function () {
                MainPage = new main_1.default({
                    width: winW,
                    height: winH,
                    minWidth: winW,
                    minHeight: winH
                });
                MainPage.on('show', function () {
                    LaunchPage.close();
                });
            }, 3000);
            new tray_1.default(MainPage);
        });
        return [2 /*return*/];
    });
}); });
electron_1.ipcMain.on('open-suspend', function () {
    MainPage.min();
    SuspendWin.getWebContents().send('record-start');
    MainPage.getWebContents().send('record-start');
});
electron_1.ipcMain.on('close-suspend', function () {
    SuspendWin.getWebContents().send('record-stop');
    MainPage.getWebContents().send('record-stop');
});
electron_1.ipcMain.on('main-show', function () {
    MainPage.show();
});
electron_1.ipcMain.on('directory-open', function (event, arg) {
    var file = path.join(constant_1.VIDEO_PATH, arg);
    electron_1.shell.showItemInFolder(file);
});
electron_1.ipcMain.on('recive-desktop', function (event) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var sizeInfo, source;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sizeInfo = getSize();
                return [4 /*yield*/, electron_1.desktopCapturer.getSources({
                        types: ['window', 'screen'],
                        thumbnailSize: sizeInfo
                    })];
            case 1:
                source = _a.sent();
                event.reply('transport-source', source[0]);
                return [2 /*return*/];
        }
    });
}); });
