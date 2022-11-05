import { templateDefault } from './constant'
import * as inquirer from 'inquirer';
import ora from 'ora';
import * as path from 'path'
// import ora = require('ora');
import chalk from 'chalk';
import { copyDir, emptyDir, mkDir } from './dir';
import { templateURL } from './constant';
import {spawn}  from 'child_process'

interface ProjectParams {
    projectName: string;
    template: string;
}
const chooseTemplate = async () => {
    const {
        template
    } = await inquirer.prompt({
        type: 'list',
        name: 'template',
        choices: templateDefault,
        message: 'please choose a preset for project'
    })
    return template
}

const downloadTemplate = (projectParams: ProjectParams) => {
    return new Promise((resolve, reject) => {
        const tmpPath = path.join(process.cwd(), `.tmp${new Date().getTime()}`)
        mkDir(tmpPath);
        const childPro = spawn(`git clone ${templateURL}`, {
            shell: true,
            cwd: tmpPath
        })
        childPro.on('close', async (code: number) => {
            if(code === 0) {
                console.log(path.join(tmpPath, 'electron-learn'))
                await copyDir(path.join(tmpPath, 'electron-learn') , path.join(process.cwd(), projectParams.projectName));
                await emptyDir(tmpPath);
                resolve('success')
            } else {
                reject('failed');
            }
        })
        childPro.on('error', reject)
    })
}

export const createProject = async (projectName) => {
    console.log(projectName)
    const spinner = ora('正在加载中，请稍后...')
    try {
        const template = await chooseTemplate()
        const params: ProjectParams = {projectName, template}
        spinner.start();
        console.log(template);
        await downloadTemplate(params);
        spinner.succeed(`${chalk.green('succeesful for Building a new Porject')}`)
    } catch (error) {
        console.log(error.stack);
        spinner.fail(`${chalk.yellow('failed for Building a new Porject')}`)
    }
}

// module.exports = {
//     createProject
// }

export default {
    createProject
}