'use strict';
// Modules
var express = require('express');
var fs      = require('fs');
var path    = require('path');

var logger       = require('morgan');
var bodyParser   = require("body-parser");
var errorHandler = require('errorhandler');
var _            = require('lodash');

// Constants
var DEVELOPMENT = 'dev';
var PRODUCTION  = 'prod';

// App settings
var ENV   = process.env['NODE_ENV'] || DEVELOPMENT
var PORT  = process.env.PORT || 8964;
var INDEX = fs.readFileSync(path.resolve(__dirname, "./src/main.html"), "utf-8");
var STATS = require('./src/stats.json');
var HASH  = STATS.hash;
var STYLE_URL   = STATS.publicPath + "main.css?" + STATS.hash;

// Development Settings Only
if (ENV === DEVELOPMENT) {
  var webpack          = require('webpack');
  var DevServer = require('webpack-dev-server');
  var WebpackDevConfig = require('./webpack/dev-config');
  var webpackDevServer = new DevServer(webpack(WebpackDevConfig), {
    publicPath  : WebpackDevConfig.output.publicPath,
    contentBase : "http://localhost:"+ PORT +"/",
    hot         : true,
    progress    : true,
    stats       : {
      colors: true
    }
  });
  if(!WebpackDevConfig.opts.separateStylesheet) {
    STYLE_URL = "";
  }
  webpackDevServer.listen(WebpackDevConfig.opts.port, function(err, result) {
    if (err) {
      console.log(err);
    }
  });

  console.log('Webpack development web server started on port: ' + WebpackDevConfig.opts.port);

}

// Main App Settings
var server = express();

// Pre-use common options
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.disable('x-powered-by');

var scripts = ['commons.js', 'main.js'];

if (ENV === DEVELOPMENT) {
  server.use(logger('dev'));
  server.use(errorHandler());
  scripts = scripts.map(function(s) {
    return WebpackDevConfig.output.publicPath + s + '?' + HASH;
  });
}

if (ENV === PRODUCTION) {
  server.use("/", express.static(path.join(__dirname, "dist"), {
      maxAge: "200d" // We can cache them as they include hashes
  }));
  scripts = scripts.map(function(s) {
    return "/" + s + '?'+HASH;
  });
}


// Routing
server.get('/*', function(req, res, next) {
  var html = _.template(INDEX)(_.extend({}, res.locals, {
    scripts      : scripts,
    styles       : STYLE_URL,
    isProduction : ENV === PRODUCTION
  }));
  res.send(html);
});

// Start the web server
server.listen(PORT, function() {
  console.log('Web server started on port: ' + PORT);
});
