"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var electron_1 = require("electron");
var path = require('path');
var iconPath = path.join(__static, 'icon-desk.png');
var events = require('events');
var tray;
/**
 * 系统托盘
 */
var TrayBox = /** @class */ (function (_super) {
    tslib_1.__extends(TrayBox, _super);
    function TrayBox(mp) {
        var _this = _super.call(this) || this;
        // 创建托盘
        tray = new electron_1.Tray(iconPath);
        tray.setToolTip('老万录屏');
        tray.on('click', function () {
            mp && mp.show();
        });
        // 右键点击图标时，出现的菜单
        tray.on('right-click', function () {
            var menuConfig = electron_1.Menu.buildFromTemplate([
                {
                    label: '退出',
                    click: function () {
                        setTimeout(function () {
                            _this.closeAllWindows();
                        }, 2000);
                    }
                }
            ]);
            tray.popUpContextMenu(menuConfig);
        });
        return _this;
    }
    // 关闭所有窗口
    TrayBox.prototype.closeAllWindows = function () {
        var allwindow = electron_1.BrowserWindow.getAllWindows();
        //  扫描并关闭除了主窗口外的所有窗口
        try {
            if (allwindow.length) {
                for (var i = 0; i < allwindow.length; i++) {
                    if (allwindow[i] && allwindow[i].isVisible()) {
                        allwindow[i].close();
                    }
                }
                electron_1.app.quit();
            }
            else {
                electron_1.app.quit();
            }
        }
        catch (error) {
            throw new Error('close all windows error!');
        }
    };
    return TrayBox;
}(events));
exports.default = TrayBox;
