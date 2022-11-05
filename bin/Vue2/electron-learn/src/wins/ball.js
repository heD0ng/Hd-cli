"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var electron_1 = require("electron");
var lib_1 = require("vue-cli-plugin-electron-builder/lib");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var events = require('events');
var winConfig = {
    focusable: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    },
    resizable: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true
};
var SuspendBall = /** @class */ (function (_super) {
    tslib_1.__extends(SuspendBall, _super);
    function SuspendBall(confInfo) {
        var _this = _super.call(this) || this;
        _this.confInfo = confInfo;
        _this.state = Object.assign({}, winConfig, confInfo);
        _this.windowInstance = new electron_1.BrowserWindow(_this.state);
        if (process.env.WEBPACK_DEV_SERVER_URL) {
            _this.windowInstance.loadURL("".concat(process.env.WEBPACK_DEV_SERVER_URL, "/#/suspend"));
            // this.windowInstance.webContents.openDevTools()
        }
        else {
            (0, lib_1.createProtocol)('app');
            _this.windowInstance.loadURL('app://./index.html/#/suspend');
        }
        var workArea = electron_1.screen.getPrimaryDisplay().workArea;
        _this.windowInstance.setPosition(workArea.width - 265, workArea.height - 265);
        _this.windowInstance.setSkipTaskbar(true);
        _this.init();
        return _this;
    }
    SuspendBall.prototype.init = function () {
        var _this = this;
        this.windowInstance.once('ready-to-show', function () {
            _this.windowInstance.show();
        });
        this.windowInstance.on('show', function () {
            _this.emit('show');
        });
        this.listenIpc();
    };
    SuspendBall.prototype.listenIpc = function () {
        var _this = this;
        var _a = this.confInfo, width = _a.width, height = _a.height;
        electron_1.ipcMain.on('move-suspend', function (event, pos) {
            _this.windowInstance && _this.windowInstance.setBounds({ width: width, height: height });
            _this.windowInstance && _this.windowInstance.setPosition(pos.baseX, pos.baseY);
        });
    };
    SuspendBall.prototype.getWebContents = function () {
        return this.windowInstance.webContents;
    };
    SuspendBall.prototype.getWindowInstance = function () {
        return this.windowInstance;
    };
    SuspendBall.prototype.hide = function () {
        this.windowInstance && this.windowInstance.hide();
    };
    SuspendBall.prototype.close = function () {
        if (this.windowInstance && this.windowInstance.isVisible()) {
            this.windowInstance.close();
            this.windowInstance = null;
        }
    };
    return SuspendBall;
}(events));
exports.default = SuspendBall;
