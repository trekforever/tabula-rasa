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

// Main App Settings
var server = express();
// Pre-use common options
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.disable('x-powered-by');

// Development Settings Only
if (ENV === DEVELOPMENT) {
  var webpack          = require('webpack');
  var WebpackDevConfig = require('./webpack/dev-config');
  var compiler         = webpack(WebpackDevConfig);
  
  server.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: WebpackDevConfig.output.publicPath
  }));
  server.use(require('webpack-hot-middleware')(compiler));

  // Have to disable separate stylesheet for hot-reload or else it won't work
  STYLE_URL = "";

}


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
