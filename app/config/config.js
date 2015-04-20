"use strict";
var pkg = require('../pkg/pkg');
var rootPath = pkg.sys.rootPath;
var config = require(pkg.sys.path.normalize(__dirname + pkg.sys.util.format('/%s.config.js', pkg.sys.nodeEnv)))(rootPath);
module.exports = config;

