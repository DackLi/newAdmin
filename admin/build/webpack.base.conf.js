'use strict'
// webpack基础配置信息
const path = require('path')
const utils = require('./utils') // 工具类 一些方法
const config = require('../config') // 默认引入config的index.js
const vueLoaderConfig = require('./vue-loader.conf') // cssloader的设置

// 绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  // 入口函数
  entry: {
    app: './src/main.js'
  },
  // 输出函数
  output: {
    path: config.build.assetsRoot, // webpack输出（生产环境build）的目标文件夹路径
    filename: '[name].js', // webpack打包生成的js文件命名
    // webpack编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 配置模块如何被解析，就是import或者require的一些配置
  resolve: {
    // 配置文件后缀扩展
    extensions: ['.js', '.vue', '.json', 'less','.css' ],
    // 配置段路径
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // @代表src
      '@': resolve('src'),
      // assets
      'assets': resolve('src/assets')
    }
  },
  // 模块化加载juery  const $ = require("jquery")
  // externals: {
  //   // jquery: 'jQuery'
  //   $: 'jquery',
  //   jQuery: 'jquery',
  //   'window.jQuery': 'jquery',
  //   'window.$': 'jquery',
  // },
  // 对相应文件的编译使用什么工具的配置
  module: {
    rules: [
      // 遵守eslint语法
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      // 对所有.vue文件使用vue-loader进行编译
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      // 对图片资源文件使用url-loader
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // 对其他资源文件使用url-loader
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      // 对字体资源文件使用url-loader
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
