{
  "bail": true,
  "entry": {
    "index": [
    "./src/index.js"
    ]
  },
  "output": {
    "path": "/Users/wiliam/Aylson/qite-oa/dist",
    "filename": "[name].js",
    "publicPath": "/",
    "libraryTarget": "var",
    "chunkFilename": "[id].async.js"
  },
  "resolve": {
    "extensions": [
    ".web.js",
    ".web.jsx",
    ".web.ts",
    ".web.tsx",
    ".js",
    ".json",
    ".jsx",
    ".ts",
    ".tsx",
    ""
    ]
  },
  "resolveLoader": {
    "root": [
    "/Users/wiliam/Aylson/qite-oa/node_modules/.0.6.0-beta.6@roadhog/node_modules",
    "/Users/wiliam/Aylson/qite-oa/node_modules"
    ],
    "moduleTemplates": [
    "*-loader"
    ]
  },
  "module": {
    "loaders": [
    {
      "exclude": [
      /\.html$/,
      /\.(js|jsx)$/,
      /\.(css|less)$/,
      /\.json$/,
      /\.svg$/,
      /\.tsx?$/
      ],
      "loader": "url",
      "query": {
        "limit": 10000,
        "name": "static/[name].[hash:8].[ext]"
      }
    },
    {
      "test": /\.(js|jsx)$/,
      "include": "/Users/wiliam/Aylson/qite-oa/src",
      "loader": "babel"
    },
    {
      "test": /\.css$/,
      "include": "/Users/wiliam/Aylson/qite-oa/src",
      "loader": "/Users/wiliam/Aylson/qite-oa/node_modules/.1.0.1@extract-text-webpack-plugin/loader.js?{\"omit\":1,\"extract\":true,\"remove\":true}!style!css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]!postcss"
    },
    {
      "test": /\.less$/,
      "include": "/Users/wiliam/Aylson/qite-oa/src",
      "loader": "/Users/wiliam/Aylson/qite-oa/node_modules/.1.0.1@extract-text-webpack-plugin/loader.js?{\"omit\":1,\"extract\":true,\"remove\":true}!style!css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]!postcss!less?{\"modifyVars\":{\"@border-radius-base\":\"3px\",\"@border-radius-sm\":\"2px\",\"@shadow-color\":\"rgba(0,0,0,0.05)\",\"@shadow-1-down\":\"4px 4px 40px @shadow-color\",\"@border-color-split\":\"#eee\",\"@border-color-base\":\"#d9d9d9\",\"@menu-dark-bg\":\"#3e3e3e\",\"@text-color\":\"#666\",\"@font-size-base\":\"14px\",\"@font-family\":\"\\\"AvenirNext-Regular\\\", \\\"Helvetica Neue\\\", \\\"lucida grande\\\", \\\"PingFangHK-Light\\\", \\\"STHeiti\\\", \\\"Heiti SC\\\", \\\"Hiragino Sans GB\\\", \\\"Microsoft JhengHei\\\", \\\"Microsoft Yahei\\\", SimHei, \\\"WenQuanYi Micro Hei\\\", \\\"Droid Sans\\\", \\\"Roboto\\\", Helvetica, Tahoma, Arial, \\\"sans-serif\\\"\",\"@icon-url\":\"\\\"/antd/iconfont\\\"\"}}"
    },
    {
      "test": /\.css$/,
      "include": "/Users/wiliam/Aylson/qite-oa/node_modules",
      "loader": "/Users/wiliam/Aylson/qite-oa/node_modules/.1.0.1@extract-text-webpack-plugin/loader.js?{\"omit\":1,\"extract\":true,\"remove\":true}!style!css?importLoaders=1!postcss"
    },
    {
      "test": /\.less$/,
      "include": "/Users/wiliam/Aylson/qite-oa/node_modules",
      "loader": "/Users/wiliam/Aylson/qite-oa/node_modules/.1.0.1@extract-text-webpack-plugin/loader.js?{\"omit\":1,\"extract\":true,\"remove\":true}!style!css?importLoaders=1!postcss!less?{\"modifyVars\":{\"@border-radius-base\":\"3px\",\"@border-radius-sm\":\"2px\",\"@shadow-color\":\"rgba(0,0,0,0.05)\",\"@shadow-1-down\":\"4px 4px 40px @shadow-color\",\"@border-color-split\":\"#eee\",\"@border-color-base\":\"#d9d9d9\",\"@menu-dark-bg\":\"#3e3e3e\",\"@text-color\":\"#666\",\"@font-size-base\":\"14px\",\"@font-family\":\"\\\"AvenirNext-Regular\\\", \\\"Helvetica Neue\\\", \\\"lucida grande\\\", \\\"PingFangHK-Light\\\", \\\"STHeiti\\\", \\\"Heiti SC\\\", \\\"Hiragino Sans GB\\\", \\\"Microsoft JhengHei\\\", \\\"Microsoft Yahei\\\", SimHei, \\\"WenQuanYi Micro Hei\\\", \\\"Droid Sans\\\", \\\"Roboto\\\", Helvetica, Tahoma, Arial, \\\"sans-serif\\\"\",\"@icon-url\":\"\\\"/antd/iconfont\\\"\"}}"
    },
    {
      "test": /\.html$/,
      "loader": "file?name=[name].[ext]"
    },
    {
      "test": /\.json$/,
      "loader": "json"
    },
    {
      "test": /\.tsx?$/,
      "include": "/Users/wiliam/Aylson/qite-oa/src",
      "loader": "babel!awesome-typescript"
    },
    {
      "test": /\.svg$/,
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
      "test":/\.(svg)$/i,
      "loader": "svg-sprite",
      "include": [
      "/Users/wiliam/Aylson/qite-oa/src/svg",
      "/Users/wiliam/Aylson/qite-oa/node_modules/.2.11.0@antd/lib/"
      ]
    }
    ]
  },
  "babel": {
    "presets": [
    "/Users/wiliam/Aylson/qite-oa/node_modules/.6.24.1@babel-preset-es2015/lib/index.js",
    "/Users/wiliam/Aylson/qite-oa/node_modules/.6.24.1@babel-preset-react/lib/index.js",
    "/Users/wiliam/Aylson/qite-oa/node_modules/.6.24.1@babel-preset-stage-0/lib/index.js"
    ],
    "plugins": [
    "/Users/wiliam/Aylson/qite-oa/node_modules/.0.2.1@babel-plugin-add-module-exports/lib/index.js",
    "/Users/wiliam/Aylson/qite-oa/node_modules/.3.0.0@babel-plugin-react-require/lib/index.js",
    "transform-runtime",
    [
    "import",
    {
      "libraryName": "antd",
      "style": true
    }
    ]
    ],
    "cacheDirectory": true
  },
  "plugins": [
  {
    "definitions": {
      "process.env": {
        "NODE_ENV": "\"production\""
      }
    }
  },
  
  {
    "filename": "[name].css",
    "options": {

    },
    "id": 1
  },
  {
    "options": {
      "compress": {
        "screw_ie8": true,
        "warnings": false
      },
      "mangle": {
        "screw_ie8": true
      },
      "output": {
        "comments": false,
        "screw_ie8": true,
        "ascii_only": true
      }
    }
  },
  {
    apply : function apply(compiler) {
      var fileDependencies = [];
      var contextDependencies = [];
      var written = {};

      compiler.plugin('emit', function (compilation, cb) {
        debug('starting emit');
        var callback = function callback() {
          debug('finishing emit');
          cb();
        };

        var globalRef = {
          info: info,
          debug: debug,
          warning: warning,
          compilation: compilation,
          written: written,
          fileDependencies: fileDependencies,
          contextDependencies: contextDependencies,
          context: compiler.options.context,
          output: compiler.options.output.path,
          ignore: options.ignore || [],
          copyUnmodified: options.copyUnmodified,
          concurrency: options.concurrency
        };

        if (globalRef.output === '/' && compiler.options.devServer && compiler.options.devServer.outputPath) {
          globalRef.output = compiler.options.devServer.outputPath;
        }

        _bluebird2.default.each(patterns, function (pattern) {
                // Identify absolute source of each pattern and destination type
                return (0, _preProcessPattern2.default)(globalRef, pattern).then(function (pattern) {
                    // Every source (from) is assumed to exist here
                    return (0, _processPattern2.default)(globalRef, pattern);
                  });
              }).catch(function (err) {
                compilation.errors.push(err);
              }).finally(callback);
            });

      compiler.plugin('after-emit', function (compilation, cb) {
        debug('starting after-emit');
        var callback = function callback() {
          debug('finishing after-emit');
          cb();
        };

            // Add file dependencies if they're not already tracked
            _lodash2.default.forEach(fileDependencies, function (file) {
              if (_lodash2.default.includes(compilation.fileDependencies, file)) {
                debug('not adding ' + file + ' to change tracking, because it\'s already tracked');
              } else {
                debug('adding ' + file + ' to change tracking');
                compilation.fileDependencies.push(file);
              }
            });

            // Add context dependencies if they're not already tracked
            _lodash2.default.forEach(contextDependencies, function (context) {
              if (_lodash2.default.includes(compilation.contextDependencies, context)) {
                debug('not adding ' + context + ' to change tracking, because it\'s already tracked');
              } else {
                debug('adding ' + context + ' to change tracking');
                compilation.contextDependencies.push(context);
              }
            });

            callback();
          });
    }
  }
  ],
  "node": {
    "fs": "empty",
    "net": "empty",
    "tls": "empty"
  }
}