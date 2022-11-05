// import * as ncp from 'ncp';
import ncp = require('ncp');
import * as fs from 'fs'
import chalk from 'chalk';
import * as path from 'path';

// 可递归手写或者是github上查找这个包具体使用方式；
export const copyDir = (sourcePath:string, destPath: string) => {
    ncp(sourcePath, destPath);
    // 复制的文件共用内存地址；
}

export const emptyDir = (filePath: string) => {
    if(!fs.existsSync(filePath)) return console.log(`${chalk.green(' warning: the path is not existing')}`);
    if(isDir(filePath)) {
        const files = fs.readdirSync(filePath);
        files.forEach(file => {
            const curPath = path.join(filePath, file)
            if(isDir(curPath)) {
                emptyDir(curPath)
            } else {
                fs.unlinkSync(curPath)
            }
        })
        fs.rmdirSync(filePath);// 删除空白文件夹
    }
    // unlink: for file
}

export const isDir = (filePath) => {
    if(fs.existsSync(filePath)) {
        return fs.statSync(filePath).isDirectory()
    }
    return false;
}

export const mkDir = (filePath: string) => {
    if(fs.existsSync(filePath)) return console.log(`${chalk.green(' warning: the file already exists')}`);
    fs.mkdirSync(filePath);
}