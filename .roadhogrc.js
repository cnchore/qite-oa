const path = require('path')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, ''),
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  "theme": "./theme.config.js",
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
          ["import", { "libraryName": "antd", "style": true}]
        ]
      },
      "production": {
        "publicPath": "/",
        "extraBabelPlugins": [
          "transform-runtime",
          ["import", { "libraryName": "antd", "style": true}]
        ]
      }
      
  }
}
