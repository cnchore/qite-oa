const path = require('path')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, ''),
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  "theme": "./theme.config.js",
  // "externals": {
  //   "react": "react"
  // },
  "proxy": {
    '/qite':{
      // target: "http://192.168.0.137:8080",
      target: "http://test.aylsonclub.com",
      // target: "http://www.aylsonclub.com",
      changeOrigin: true,
      secure: false,
      pathRewrite: {'^/qite' : '/qite'},
    },
    // '/qite/busi':{
    //   target: "http://test.aylsonclub.com",
    //   // target: "http://192.168.0.119:8080",
    //   // target: "http://www.aylsonclub.com",
    //   changeOrigin: true,
    //   secure: false,
    //   pathRewrite: {'^/qite/busi' : '/qite/busi'},
    // },
    // '/qite/websocket':{
    //   // target: "ws://www.aylsonclub.com",
    //   target: "ws://test.aylsonclub.com",
    //   // target: "ws://192.168.0.119:8080",
    //   changeOrigin: true,
    //   secure: false,
    //   pathRewrite: {'^/qite/websocket' : '/qite/websocket'},
    // },
  },
  
  "env": {
      "development": {
        "extraBabelPlugins": [
          "dva-hmr",
          "transform-runtime",
          ["import", { "libraryName": "antd", "style": true}],
        ]
      },
      "production": {
        "publicPath": "/",
        // "output": {
        //   "filename": "[name].[chunkhash].js",
        //   "chunkFilename": "[chunkhash].async.js"
        // },
        "extraBabelPlugins": [
          "transform-runtime",
          ["import", { "libraryName": "antd", "style": true}],
        ]
      }
  }
  ,
  "dllPlugin": {
   // "name":"[name].[chunkhash]",
    "exclude": [
      "babel-runtime"
    ],
    "include": [
      'react',
      "dva",
      "dva/router",
    ]
  }

}
