const fs = require('fs')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')

module.exports = function (config, env) {
  config.module.loaders[0].exclude.push(/\.ejs$/)    // 注 1
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