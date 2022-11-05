"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var electron_1 = require("electron");
var lib_1 = require("vue-cli-plugin-electron-builder/lib");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var events = require('events');
var winConfig = {
    show: false,
    frame: false,
    focusable: true,
    alwaysOnTop: false,
    resizable: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
};
var Launch = /** @class */ (function (_super) {
    tslib_1.__extends(Launch, _super);
    function Launch(confInfo) {
        var _this = _super.call(this) || this;
        _this.confInfo = confInfo;
        _this.state = Object.assign({}, winConfig, confInfo);
        _this.windowInstance = new electron_1.BrowserWindow(_this.state);
        if (process.env.WEBPACK_DEV_SERVER_URL) {
            _this.windowInstance.loadURL("".concat(process.env.WEBPACK_DEV_SERVER_URL, "/#/launchPage"));
            // this.windowInstance.webContents.openDevTools()
        }
        else {
            (0, lib_1.createProtocol)('app');
            _this.windowInstance.loadURL('app://./index.html/#/launchPage');
        }
        _this.init();
        return _this;
    }
    Launch.prototype.init = function () {
        var _this = this;
        this.windowInstance.once('ready-to-show', function () {
            _this.windowInstance.show();
        });
        this.windowInstance.on('show', function () {
            _this.emit('show');
        });
        this.listenIpc();
    };
    Launch.prototype.listenIpc = function () {
        var _this = this;
        var _a = this.confInfo, width = _a.width, height = _a.height;
        electron_1.ipcMain.on('move-launch', function (event, pos) {
            _this.windowInstance && _this.windowInstance.setBounds({ width: width, height: height });
            _this.windowInstance && _this.windowInstance.setPosition(pos.baseX, pos.baseY);
        });
    };
    Launch.prototype.getWebContents = function () {
        return this.windowInstance.webContents;
    };
    Launch.prototype.getWindowInstance = function () {
        return this.windowInstance;
    };
    Launch.prototype.hide = function () {
        this.windowInstance && this.windowInstance.hide();
    };
    Launch.prototype.close = function () {
        if (this.windowInstance && this.windowInstance.isVisible()) {
            this.windowInstance.close();
            this.windowInstance = null;
        }
    };
    return Launch;
}(events));
exports.default = Launch;
