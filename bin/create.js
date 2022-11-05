"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = void 0;
var tslib_1 = require("tslib");
var constant_1 = require("./constant");
var inquirer = tslib_1.__importStar(require("inquirer"));
var ora_1 = tslib_1.__importDefault(require("ora"));
var path = tslib_1.__importStar(require("path"));
// import ora = require('ora');
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var dir_1 = require("./dir");
var constant_2 = require("./constant");
var child_process_1 = require("child_process");
var chooseTemplate = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var template;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer.prompt({
                    type: 'list',
                    name: 'template',
                    choices: constant_1.templateDefault,
                    message: 'please choose a preset for project'
                })];
            case 1:
                template = (_a.sent()).template;
                return [2 /*return*/, template];
        }
    });
}); };
var downloadTemplate = function (projectParams) {
    return new Promise(function (resolve, reject) {
        var tmpPath = path.join(process.cwd(), ".tmp".concat(new Date().getTime()));
        (0, dir_1.mkDir)(tmpPath);
        var childPro = (0, child_process_1.spawn)("git clone ".concat(constant_2.templateURL), {
            shell: true,
            cwd: tmpPath
        });
        childPro.on('close', function (code) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(code === 0)) return [3 /*break*/, 2];
                        console.log(path.join(process.cwd(), projectParams.projectName));
                        return [4 /*yield*/, (0, dir_1.copyDir)(tmpPath, path.join(process.cwd(), projectParams.projectName))];
                    case 1:
                        _a.sent();
                        // await emptyDir(tmpPath);
                        resolve('success');
                        return [3 /*break*/, 3];
                    case 2:
                        reject('failed');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        childPro.on('error', reject);
    });
};
var createProject = function (projectName) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var spinner, template, params, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(projectName);
                spinner = (0, ora_1.default)('正在加载中，请稍后...');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, chooseTemplate()];
            case 2:
                template = _a.sent();
                params = { projectName: template };
                spinner.start();
                console.log(template);
                return [4 /*yield*/, downloadTemplate(params)];
            case 3:
                _a.sent();
                spinner.succeed("".concat(chalk_1.default.green('succeesful for Building a new Porject')));
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log(error_1.stack);
                spinner.fail("".concat(chalk_1.default.yellow('failed for Building a new Porject')));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createProject = createProject;
// module.exports = {
//     createProject
// }
exports.default = {
    createProject: exports.createProject
};
