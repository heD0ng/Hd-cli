"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
var constant_1 = require("./constant");
var path = require('path');
var http = require('http');
var url = require('url');
var fs = require('fs');
var net = require('net');
var port = 9000;
function httpServer(callback) {
    var server = http.createServer(function (req, res) {
        var pathName = url.parse(req.url).pathname;
        var realPath = path.join(constant_1.VIDEO_PATH, pathName);
        fs.readFile(decodeURIComponent(realPath), function (err, data) {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain;charset=utf-8'
                });
                res.write('404');
                res.end();
            }
            else {
                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(data)
                });
                res.write(data);
                res.end('ok');
            }
        });
    });
    var serverUrl = "http://localhost:9000";
    server.listen(9000, '127.0.0.1', function () {
        // console.log('服务开启成功！！！')
        console.log('静态文件服务地址 :>> ', serverUrl);
        callback();
    });
}
exports.httpServer = httpServer;
function portIsOccupied(checkPort) {
    return new Promise(function (resolve, reject) {
        var server = net.createServer().listen(checkPort, '127.0.0.1');
        server.on('listening', function () {
            console.log("the server is runnint on port ".concat(checkPort));
            server.close();
            // 使用注入进程环境变量的方式进行状态共享
            process.env.DEV_PORT = checkPort;
            process.env.PROD_PORT = checkPort;
            // 返回可用端口
            resolve(checkPort);
        });
        server.on('error', function (err) {
            if (err.code === 'EADDRINUSE') {
                // 占用端口号+1
                resolve(portIsOccupied(checkPort + 1));
                console.log("this port ".concat(checkPort, " is occupied.try another."));
            }
            else {
                reject(err);
            }
        });
    });
}
