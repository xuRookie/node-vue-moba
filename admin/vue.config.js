const path = require('path')

module.exports = {
    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
    lintOnSave: process.env.NODE_ENV !== "production",

    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    outputDir: path.resolve(__dirname, '../server/public/admin'),
    publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
    devServer: {
        host: "localhost",
        port: 8300, // 端口号
        https: false,
        open: true, //配置自动启动浏览器

        // 配置多个代理
        //   proxy: {
        //     "/api": {
        //       target: "http://localhost:3000", // 本地模拟数据服务器
        //       changeOrigin: true,
        //       pathRewrite: {
        //         "^/api": "" // 去掉接口地址中的api字符串
        //       }
        //     },
        //     "/foo": {
        //       target: "http://localhost:8080", // 本地模拟数据服务器
        //       changeOrigin: true,
        //       pathRewrite: {
        //         "^/foo": "" // 去掉接口地址中的foo字符串
        //       }
        //     }
        //   }
    },
    configureWebpack: (config) => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
        // if (debug) { // 开发环境配置
        //     config.devtool = 'cheap-module-eval-source-map'
        // } else { // 生产环境配置

        // }
        Object.assign(config, { // 开发生产共同配置
            resolve: {
                extensions: ['.js', '.vue', '.json'], // 可不写的扩展名
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    '@assets': path.resolve(__dirname, './src/assets')
                }
            }
        })
    },
};
