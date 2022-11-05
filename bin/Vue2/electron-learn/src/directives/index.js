"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mouseDrag_1 = tslib_1.__importDefault(require("./mouseDrag"));
exports.default = {
    install: function (app) {
        app.directive('mouse-drag', mouseDrag_1.default);
    }
};
