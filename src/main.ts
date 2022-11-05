#! /usr/bin/env node

import {
    Command
} from "commander";
import {
    version
} from './constant';
import {
    createProject
} from './create';
const start = () => {
    console.log('start')
    const program = new Command()
    program
        .command('create')
        .description('hd-cli create <projectName>')
        .action(async (options) => {
            console.log(options)
            await createProject([...process.argv][3])
        })

    program
        .version(version)

    program.on('--help', () => {
        console.log('help')
    })

    program.parse(process.argv)
}

start()