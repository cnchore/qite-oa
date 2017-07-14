const fs = require('fs')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')

module.exports = function (config, env) {
  // console.log(JSON.stringify(config.module.loaders))
  const loaders=[
    {
      test:/\.(png|jpg|gif)$/,
      "include":path.resolve(__dirname,'src'),
      "exclude":/\.ejs$/,
      "loader": "url",
      "query": {
        "limit": 10000,
        "name": "static/[name].[hash:8].[ext]"
      }
    },
    {
      "test": /\.js$/,
      "include": path.resolve(__dirname,'src'),
      "loader": "babel"
    },
    {
      "test": /\.css$/,
      "include": path.resolve(__dirname,'src'),
      "loader": "style!css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]!postcss"
    },
    {
      "test": /\.less$/,
      "include": path.resolve(__dirname,'src'),
      "loader": "style!css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]!postcss!less?{\"modifyVars\":{\"@border-radius-base\":\"3px\",\"@border-radius-sm\":\"2px\",\"@shadow-color\":\"rgba(0,0,0,0.05)\",\"@shadow-1-down\":\"4px 4px 40px @shadow-color\",\"@border-color-split\":\"#eee\",\"@border-color-base\":\"#d9d9d9\",\"@menu-dark-bg\":\"#3e3e3e\",\"@text-color\":\"#666\",\"@font-size-base\":\"14px\",\"@font-family\":\"\\\"AvenirNext-Regular\\\", \\\"Helvetica Neue\\\", \\\"lucida grande\\\", \\\"PingFangHK-Light\\\", \\\"STHeiti\\\", \\\"Heiti SC\\\", \\\"Hiragino Sans GB\\\", \\\"Microsoft JhengHei\\\", \\\"Microsoft Yahei\\\", SimHei, \\\"WenQuanYi Micro Hei\\\", \\\"Droid Sans\\\", \\\"Roboto\\\", Helvetica, Tahoma, Arial, \\\"sans-serif\\\"\",\"@icon-url\":\"\\\"/antd/iconfont\\\"\"}}"
    },
    {
      "test": /\.css$/,
      "include": path.resolve(__dirname,'src'),
      "loader": "style!css?importLoaders=1!postcss"
    },
    {
      "test": /\.less/,
      "include": path.resolve(__dirname,'src'),
      "loader": "style!css?importLoaders=1!postcss!less?{\"modifyVars\":{\"@border-radius-base\":\"3px\",\"@border-radius-sm\":\"2px\",\"@shadow-color\":\"rgba(0,0,0,0.05)\",\"@shadow-1-down\":\"4px 4px 40px @shadow-color\",\"@border-color-split\":\"#eee\",\"@border-color-base\":\"#d9d9d9\",\"@menu-dark-bg\":\"#3e3e3e\",\"@text-color\":\"#666\",\"@font-size-base\":\"14px\",\"@font-family\":\"\\\"AvenirNext-Regular\\\", \\\"Helvetica Neue\\\", \\\"lucida grande\\\", \\\"PingFangHK-Light\\\", \\\"STHeiti\\\", \\\"Heiti SC\\\", \\\"Hiragino Sans GB\\\", \\\"Microsoft JhengHei\\\", \\\"Microsoft Yahei\\\", SimHei, \\\"WenQuanYi Micro Hei\\\", \\\"Droid Sans\\\", \\\"Roboto\\\", Helvetica, Tahoma, Arial, \\\"sans-serif\\\"\",\"@icon-url\":\"\\\"/antd/iconfont\\\"\"}}"
    },
    {
      "test": /\.html$/,
      "include": path.resolve(__dirname,'src'),
      "loader": "file?name=[name].[ext]"
    },
    {
      "test": /\.json$/,
      "include": path.resolve(__dirname,'src'),
      "loader": "json"
    },
    {
      "test": /\.(eot|svg|ttf|wooff)$/,
      "include": path.resolve(__dirname,'src'),
      "loader": "babel!awesome-typescript"
    },
    {
      "test":/\.(svg|doc|xlsx|docx|txt)$/,
      "loader": "file",
      "query": {
        "name": "static/[name].[hash:8].[ext]"
      },
      "exclude": [
        "/Users/wiliam/Aylson/qite-oa/src/svg",
        "/Users/wiliam/Aylson/qite-oa/node_modules/.2.11.0@antd/lib/"
      ]
    },
    {
      "test": /\.svg$/,
      "loader": "svg-sprite",
      "include": [
        "/Users/wiliam/Aylson/qite-oa/src/svg",
        "/Users/wiliam/Aylson/qite-oa/node_modules/.2.11.0@antd/lib/"
      ]
    }
  ]
  //config.module.loaders=loaders;
  config.module.loaders[0].exclude.push(/\.ejs$/)    // 注 1
  //config.module.loaders[0].include.push(path.resolve(__dirname,'src'));
  // for(var i=0;i<config.module.loaders.length;i++){
  //   //console.log(i+':',config.module.loaders[i])
  //   if(config.module.loaders[i].exclude&&config.module.loaders[i].exclude[0]){
  //     config.module.loaders[i].exclude.push('./node_modules/');
  //   }else{
  //     config.module.loaders[i].exclude='./node_modules/';
  //   }

  //   if(config.module.loaders[i].include&&config.module.loaders[i].include[0]){
  //     config.module.loaders[i].include.push(path.resolve(__dirname,'src'));
  //   }else{
  //     config.module.loaders[i].include=path.resolve(__dirname,'src');
  //   }
  // }
  if (env === 'production') {
    config.output.filename = '[name].[chunkhash].js'
    config.output.chunkFilename = '[chunkhash].async.js'
    config.plugins[3] = new ExtractTextPlugin('[contenthash:20].css')    // 注 2
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'ejs!src/index.ejs',    // 注 3
        inject: true,
        minify: { collapseWhitespace: true },
        production: true,
      }),
      new WebpackChunkHash({ algorithm: 'md5' })
    )
  } else {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'ejs!src/index.ejs',
        inject: true,
      }),
    )
  }
  return config
}