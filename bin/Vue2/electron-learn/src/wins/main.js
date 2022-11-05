"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var electron_1 = require("electron");
var lib_1 = require("vue-cli-plugin-electron-builder/lib");
var events = require('events');
var winConfig = {
    title: '老万录屏',
    resizable: true,
    show: false,
    frame: false,
    center: true,
    focusable: true,
    alwaysOnTop: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
    }
};
var Main = /** @class */ (function (_super) {
    tslib_1.__extends(Main, _super);
    function Main(confInfo) {
        var _this = _super.call(this) || this;
        _this.confInfo = confInfo;
        _this.state = Object.assign({}, winConfig, confInfo);
        _this.windowInstance = new electron_1.BrowserWindow(_this.state);
        if (process.env.WEBPACK_DEV_SERVER_URL) {
            console.log("".concat(process.env.WEBPACK_DEV_SERVER_URL, "/#/dashboard"));
            _this.windowInstance.loadURL("".concat(process.env.WEBPACK_DEV_SERVER_URL, "/#/dashboard"));
        }
        else {
            (0, lib_1.createProtocol)('app');
            _this.windowInstance.loadURL('app://./index.html/#/dashboard');
            // this.windowInstance.removeMenu() // 去掉菜单栏,防止通过快捷键唤起
        }
        _this.init();
        return _this;
    }
    Main.prototype.init = function () {
        var _this = this;
        this.windowInstance.once('ready-to-show', function () {
            _this.windowInstance.show();
        });
        this.windowInstance.on('show', function () {
            _this.emit('show');
        });
        this.windowInstance.on('close', function () {
            _this.emit('close');
        });
        this.listenIpc();
    };
    Main.prototype.listenIpc = function () {
        var _this = this;
        var _a = this.confInfo, width = _a.width, height = _a.height;
        electron_1.ipcMain.on('move-main', function (event, pos) {
            _this.windowInstance && _this.windowInstance.setBounds({ width: width, height: height });
            _this.windowInstance && _this.windowInstance.setPosition(pos.baseX, pos.baseY);
        });
        // 全屏
        electron_1.ipcMain.on('mainWin:max', function () {
            _this.windowInstance.setFullScreen(true);
        });
        // 还原
        electron_1.ipcMain.on('mainWin:min', function () {
            _this.windowInstance.setFullScreen(false);
        });
        // 隐藏主窗口
        electron_1.ipcMain.on('mainWin:hide', function () {
            _this.windowInstance.hide();
        });
        // 关闭主窗口
        electron_1.ipcMain.on('mainWin:close', function () {
            electron_1.app.quit();
            // this.windowInstance.close()
        });
        // 最大化
        electron_1.ipcMain.on('mainWin:maximize', function () {
            _this.windowInstance.maximize();
        });
        // 最大化恢复
        electron_1.ipcMain.on('mainWin:restore', function () {
            _this.windowInstance.restore();
        });
        // 最小化
        electron_1.ipcMain.on('mainWin:minimize', function () {
            _this.windowInstance.minimize();
        });
    };
    Main.prototype.getWebContents = function () {
        return this.windowInstance.webContents;
    };
    Main.prototype.getWindowInstance = function () {
        return this.windowInstance;
    };
    Main.prototype.show = function () {
        this.windowInstance && this.windowInstance.show();
    };
    Main.prototype.min = function () {
        this.windowInstance && this.windowInstance.minimize();
    };
    Main.prototype.close = function () {
        this.windowInstance && this.windowInstance.close();
    };
    return Main;
}(events));
exports.default = Main;
