const fs = require('fs')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')

module.exports = function (config, env) {

  config.module.loaders[0].exclude.push(/\.ejs$/);    // 注 1
  const vendors=[
    'react',
    'react-dom',
    'lodash',
    'nprogress',
    'react-draft-wysiwyg',
    'react-helmet',
    'react-router',
    'dva',
    'dva-loading',
    'antd',
    'moment',
    'dva/router'
  ]
  const noParse=[
    path.resolve(__dirname,'node_modules/react/dist/react.min'),
    path.resolve(__dirname,'node_modules/react-dom/dist/react-dom.min'),
    path.resolve(__dirname,'node_modules/dva/dist/dva.min')
  ]
 
  if (env === 'production') {
    // config.entry.lib=vendors
    config.output.publicPath='';
    config.output.path=path.resolve(__dirname,'dist');
    config.output.filename = '[hash:7]/[name].js';
    // config.output.chunkFilename = '[chunkhash].async.js';
    config.output.chunkFilename = '[hash:7]/[name].chunk.js';
    // config.output.library='[name]'
    config.plugins[3] = new ExtractTextPlugin('[contenthash:20].css');   // 注 2
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'ejs!src/index.ejs',    // 注 3
        inject: true,
        minify: { collapseWhitespace: true },
        production: true,
      }),
      new WebpackChunkHash({ algorithm: 'md5' })//,
      //new webpack.NoErrorsPlugin() 
    )
  } else {
    
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'ejs!src/index.ejs',
        inject: true,
      }),
    )
  }
  return config;
}
// (function foo(objs){
//   Object.keys(objs).forEach(key=>{
//     if(objs[key] instanceof Object && Object.keys(objs[key]).length>0){
//       console.log('--key:',key)
//       foo(objs[key])
//     }else{
//       console.log(key,':',objs[key]);
//     }
//   })
// }(config))
 // config.module.noParse=noParse;
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