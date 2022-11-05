#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var commander_1 = require("commander");
var constant_1 = require("./constant");
var create_1 = require("./create");
var start = function () {
    console.log('start');
    var program = new commander_1.Command();
    program
        .command('create')
        .description('hd-cli create <projectName>')
        .action(function (options) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(options);
                    return [4 /*yield*/, (0, create_1.createProject)(tslib_1.__spreadArray([], process.argv, true)[3])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    program
        .version(constant_1.version);
    program.on('--help', function () {
        console.log('help');
    });
    program.parse(process.argv);
};
start();
