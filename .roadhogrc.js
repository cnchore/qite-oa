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
      //http://test.aylsonclub.com
      target: "http://test.aylsonclub.com",
      //host:"test.aylsonclub.com",
      changeOrigin: true,
      secure: false,
      pathRewrite: {'^/qite' : '/qite'},
      //router:{'/qite':'http://localhost:9000/qite'}
    }
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
  // ,
  // "dllPlugin": {
  //   "name":"[name].[chunkhash]",
  //   "exclude": [
  //     "babel-runtime"
  //   ],
  //   "include": [
  //     'react',
  //     "dva",
  //     "dva/router",
  //   ]
  // }

}
