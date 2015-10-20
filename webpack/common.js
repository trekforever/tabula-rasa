var path = require("path");
var fs = require('fs');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var loadByExtensions = require("./utils/loadByExtensions");

module.exports = function(options) {
    var entry = {
        main: options.hotComponents ? ['webpack-hot-middleware/client', './client'] : './client'
    };

    var loaders = {
        "png|jpg|jpeg|gif|svg": "url?limit=100000",
        "woff|woff2": "url?limit=100000",
        "ttf|eot|ico": "file",
        "html": "html"
    },
    stylesheetLoaders = {
        "css": "css",
        "less": "css!autoprefixer!less",
    },
    additionalLoaders = [
         { test: /\.jsx$|\.js$/, loader: options.hotComponents ? "react-hot!babel?stage=0" : "babel?stage=0", exclude:/node_modules|vendor/ }
    ],
    aliasLoader = {

    },
    externals = [

    ];

    var modulesDirectories = ["vendor", "node_modules", "src"];
    var extensions = ["", ".web.js", ".js", ".jsx"];
    var root = path.join(__dirname, "../src");
    var publicPath = "/";
    var output = {
        path: path.join(__dirname, "../dist"),
        publicPath: publicPath,
        filename: "[name].js" + (options.longTermCaching ? "?[chunkhash]" : ""),
        chunkFilename: (options.longTermCaching ? "?[chunkhash]" : ""),
        sourceMapFilename: "debugging/[file].map",
        pathinfo: options.debug
    };
    var excludeFromStats = [
        /node_modules[\\\/]react(-router)?[\\\/]/
    ];
    var plugins = [
        function() {
          this.plugin("done", function(stats) {
            var jsonStats = stats.toJson({
                chunkModules: true,
                chunkOrigins: true,
                showModules: true,
                exclude: excludeFromStats
            });
            jsonStats.publicPath = publicPath;
            fs.writeFileSync(path.join(__dirname, "../src", "stats.json"), JSON.stringify(jsonStats));
          })
        },
        new webpack.PrefetchPlugin("bluebird"),
        new webpack.PrefetchPlugin("react/addons"),
        new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
    ];
    if(options.commonsChunk) {
        plugins.push(new webpack.optimize.CommonsChunkPlugin("commons", "commons.js" + (options.longTermCaching ? "?[chunkhash]" : "")));
    }

    // generate app require module shim
    var _ = require('lodash');
    var glob = require('glob');
    var files = glob.sync("src/**/*.+(jsx|js)");
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

    Object.keys(stylesheetLoaders).forEach(function(ext) {
        var loaders = stylesheetLoaders[ext];
        if(Array.isArray(loaders)) loaders = loaders.join("!");
        if(options.separateStylesheet) {
            stylesheetLoaders[ext] = ExtractTextPlugin.extract("style-loader", loaders);
        } else {
            stylesheetLoaders[ext] = "style-loader!" + loaders;
        }
    });
    if(options.separateStylesheet) {
        plugins.push(new ExtractTextPlugin("[name].css" + (options.longTermCaching ? "?[contenthash]" : "")));
    }
    if(options.hotComponents) {
        plugins.push(new webpack.optimize.OccurenceOrderPlugin());
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    if(options.minimize) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            }),
            new webpack.NoErrorsPlugin()
        );
    }

    return {
        entry: entry,
        output: output,
        opts: options,
        target: "web",
        context: __dirname + '/../src',
        module: {
            loaders: loadByExtensions(loaders).concat(loadByExtensions(stylesheetLoaders)).concat(additionalLoaders)
        },
        devtool: options.devtool,
        debug: options.debug,
        resolveLoader: {
            root: path.join(__dirname, "../node_modules"),
            alias: aliasLoader
        },
        externals: externals,
        resolve: {
            root: root,
            modulesDirectories: modulesDirectories,
            extensions: extensions,
            alias: alias
        },
        plugins: plugins,
        devServer: {
            stats: {
                exclude: excludeFromStats
            }
        }
    };
};
