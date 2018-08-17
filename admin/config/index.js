'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

// 引入nodejs的path模块，进行一些路径的操作，详情可以查看node官方的api
const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static', // 静态资源文件夹
    assetsPublicPath: '/', // 发布路径
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'localhost:2018/login'代理到'http://192.168.1.120:8085/mockjsdata/4/auth/login'
    proxyTable: {
      // '/proxy': {
      //   // target: 'http://192.168.1.3:8083'
      //   // target: 'http://192.168.1.18:8095'
      //   target: 'http://et-iot.cn:8095/',
      //   // target: 'http://192.168.1.120:8085/mockjsdata/5',
      //   changeOrigin: true, // 允许跨域
      //   // 将对资源的请求重定向到另一路径
      //   pathRewrite: {
      //     '^/proxy': ''
      //   }
      // }
    },
    // 各种Dev Server设置
    host: 'localhost', // 设置启动方式
    port: 8085, // 可以被覆盖的端口号，本地端口号配置
    autoOpenBrowser: true, // 自动打开浏览器
    errorOverlay: true, // 错误抛出是否开启
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true, // 是否开启Eslint语法检测
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },
  // 构建产品时使用的配置
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'), // html入口文件 若是没有dist文件夹就会生成dist文件夹

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'), // 产品文件的存放路径
    assetsSubDirectory: 'static', // 二级目录，存放静态资源文件的目录，位于dist文件夹下
    // 发布路径，如果构建后的产品文件有用于发布CDN或者放到其他域名的服务器，可以在这里进行设置
    // 设置之后构建的产品文件在注入到index.html中的时候就会带上这里的发布路径
    assetsPublicPath: '/', // 公共资源路径 打包构建后如果后台会增加新的路径 可以再这里配置

    /**
     * Source Maps
     */
    // 是否使用source-map
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false, // 是否开启gzip压缩
    productionGzipExtensions: ['js', 'css'], // gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report // 是否展示webpack构建打包之后的分析报告
  }
}
