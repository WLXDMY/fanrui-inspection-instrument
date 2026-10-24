/*
 * @Author: zhaozhuo
 * @Date: 2021-12-31 16:27:47
 * @LastEditors: dingfei dingf@yelinked.com
 * @LastEditTime: 2024-06-03 14:39:57
 * @Description:
 */
'use strict'

const { name } = require('./package.json')
const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const port = process.env.port || process.env.npm_config_port || 4005
const isUploadPackage = process.env.VUE_APP_UPLOAD_PACKAGE === 'true'
const publicPath = process.env.NODE_ENV === 'development'
  ? '/'
  : isUploadPackage ? '././' : '/genieos/subapps/children/qms3.0'

const pathOut = isUploadPackage
  ? 'dist-upload'
  : process.argv[3] === '--qms3.0' ? 'dist' : '../dist/main/subapps/children/qms3.0'

function resolve(dir) {
  return path.join(__dirname, dir)
}

const buildPlugins = []
if (!isUploadPackage) {
  buildPlugins.push(
    new CopyWebpackPlugin([
      {
        from: 'node_modules/@easydarwin/easyplayer/dist/component/crossdomain.xml'
      },
      {
        from: 'node_modules/@easydarwin/easyplayer/dist/component/EasyPlayer-lib.min.js'
      },
      {
        from: 'node_modules/@easydarwin/easyplayer/dist/component/EasyPlayer.swf'
      },
      {
        from: 'node_modules/@easydarwin/easyplayer/dist/component/libDecoder.wasm'
      }
    ])
  )
}

module.exports = {
  publicPath: publicPath,
  outputDir: pathOut,
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port, // 和主应用监听的端口一致
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      [process.env.VUE_APP_NGINX_PATH]: {
        target: process.env.VUE_APP_BASE_API,
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        timeout: 3 * 60 * 1000,
        pathRewrite: {
          ['^' + process.env.VUE_APP_NGINX_PATH]: '' // rewrite path
        },
        router: function () {
          try {
            return fs.readFileSync(process.cwd() + '/target.env', 'utf8') || process.env.VUE_APP_BASE_API
          } catch (error) {
            return process.env.VUE_APP_BASE_API
          }
        }
      }
    }
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : '', // 开发测试
    name: '数字工厂',
    resolve: {
      alias: {
        '@': resolve('src'),
        '@quality-management-routes': resolve(
          isUploadPackage ? 'src/router/modules/instrumentOnly.js' : 'src/router/modules/qualityManagement.js'
        ),
        '@constant-routes': resolve(
          isUploadPackage ? 'src/router/modules/instrumentOnlyConstant.js' : 'src/router/modules/constant.js'
        ),
        '@common-layout-routes': resolve(
          isUploadPackage ? 'src/router/modules/instrumentOnlyUnused.js' : 'src/router/modules/commonLayoutRoutes.js'
        )
      }
    },
    plugins: buildPlugins,
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`
    }
  },
  chainWebpack(config) {
    if (isUploadPackage) {
      config.entry('app').clear().add(resolve('src/main-upload.js'))
      config.plugin('html').tap(args => {
        args[0].template = resolve('src/index-upload.html')
        return args
      })
    }
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    config.plugins.delete('prefetch')

    // loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        minSize: 30000, // 字节 引入的文件大于30kb才进行分割
        minChunks: 1, // 模块至少使用次数
        maxAsyncRequests: 5, // 同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
        maxInitialRequests: 3, // 首页加载的时候引入的文件最多3个
        automaticNameDelimiter: '~', // 缓存组和生成文件名称之间的连接符
        name: true,
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')

      // 压缩
      // config.plugin('compressionPlugin').use(
      //   new CompressionPlugin({
      //     filename: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: /\.(js|css)$/i,
      //     threshold: 10240,
      //     minRatio: 0.8,
      //     deleteOriginalAssets: true
      //   })
      // )
    })
  }
}
