var px2rem = require('postcss-px2rem');
module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            scss: {
                additionalData: '@import "~@/assets/styles/variables.scss";'
            }
        }
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                appId: 'com.nianqing',
                productName: 'record-nianqing',
                // eslint-disable-next-line no-template-curly-in-string
                artifactName: 'record-nianqing-${version}.${ext}',
                copyright: 'Copyright © 2021 KingSun',
                // extraResources: './public/flash/',
                mac: {
                    icon: 'build/icons/icon.icns',
                    target: ['dmg']
                },
                win: {
                    icon: 'build/icons/icon.ico',
                    target: [
                        {
                            target: 'nsis',
                            arch: ['x64']
                        }
                    ]
                },
                asar: true,
                nsis: {
                    oneClick: false,
                    language: '2052',
                    // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    allowElevation: true,
                    // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
                    allowToChangeInstallationDirectory: true,
                    installerIcon: 'build/icons/icon.ico',
                    uninstallerIcon: 'build/icons/icon.ico',
                    installerHeaderIcon: 'build/icons/icon.ico',
                    createDesktopShortcut: true,
                    createStartMenuShortcut: true,
                    deleteAppDataOnUninstall: true,
                    shortcutName: '老万录屏' // 图标名称
                    // perMachine: true,
                }
            }
        }
    }
};
