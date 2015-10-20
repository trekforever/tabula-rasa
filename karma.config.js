var _ = require('lodash');
var glob = require('glob');
var files = glob.sync("src/**/*.+(jsx|js)");
var path = require('path');
var webpack = require('webpack');
var alias = _.zipObject(
  // module name
  files.map(function(f) {
    f =    _.chain(f.split('/'))
            .map(function(c) {
              return c.replace(/\.jsx|\.js/, '');
            })
            .reject(function(c) {
              return c === 'src';
            })
            .uniq(function(p, i, a){
              if (a.length - i <= 2) {
                return p;
              }
              return Math.random() * 1000;
            })
            .value();
    return f.join('/') + "$";
  }),
  // module path
  _.chain(files)
   .map(function(f) {
    return path.resolve(f);
   })
   .value()
);

module.exports = function(config) {
  config.set({
    browsers: [
      'PhantomJS',
    ],
    files: [
      {
        pattern: './webpack/tests-config.js',
        watched: false,
      },
    ],
    frameworks: [
      'jasmine'
    ],
    preprocessors: {
      './webpack/tests-config.js': [
        'webpack',
      ],
    },
    reporters: [
      'dots',
    ],
    webpack: {
      module: {
        loaders: [
          { test: /\.jsx$|\.js$/, exclude: /node_modules|vendor/, loader: 'babel?stage=0' },
          { test: /\.less$/, loader: "css!less" }
        ],
      },
      plugins: [new webpack.IgnorePlugin(/\.ttf|.svg|.eot|.woff/)],
      resolve: {
        alias: alias,
        extensions: ["", ".web.js", ".js", ".jsx"],
        modulesDirectories: [
          'src',
          'node_modules',
          'vendor'
        ],
      },
      node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};