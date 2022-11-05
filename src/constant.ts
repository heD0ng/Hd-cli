
import chalk from 'chalk'
export const { version } = require('../package.json')

export const templateDefault = [
    {
        name: `Default ${chalk.yellow('Vue2')}`,
        value: 'Vue2'
    },
    {
        name: `Default ${chalk.white('Vue3')}`,
        value: 'Vue3'
    },
    {
        name: `Default ${chalk.green('React')}`,
        value: 'React',
        disabled: `加急中，请耐心等待...`
    }
]

export const templateURL = 'https://github.com/heD0ng/electron-learn.git';
// module.exports = {
//     version,
//     templateDefault
// }

export default {
    version,
    templateDefault
}