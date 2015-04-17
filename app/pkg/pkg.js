"use strict";
exports.sys= {
    express:require('express'),
    expressValidator:require('express-validator'),
    expressFlash:require('express-flash'),
    expressSession:require('express-session'),
    fs:require('fs'),
    http:require('http'),
    querystring:require('querystring'),
    path:require('path'),
    util:require('util'),
    url:require('url'),
    morgan:require('morgan'),
    async:require('async'),
    favicon:require('serve-favicon'),
    bodyParser:require('body-parser'),
    cookieParser:require('cookie-parser'),
    responseTime:require('response-time'),
    compression:require('compression'),
    multer:require('multer'),
    lodash:require('lodash'),
    methodOverride:require('method-override'),
    errorHandler:require('errorhandler'),
    nodeEnv:process.env.NODE_ENV || 'development',
    uuid:require('node-uuid'),
    moment:require('moment'),
    mssql:require('mssql'),
    ejs:require('ejs'),
    ejsLocalsEngine:require('ejs-locals'),
    passport:require('passport'),
    passportLocal:require('passport-local'),

    packageJson:require('../../package.json')

};

exports.routes = {
    local:require('../routes/local')
};

exports.middleware = {
    views_helper:require('./middleware/views-helper')
};
//not singleton
exports.mssqlDao = {
    UserDao:require('../database/dao/mssql-userDao')
    //var c = new pkg.mssqlDao.UserDao();
    //var d = new pkg.mssqlDao.UserDao();
    //console.log(c ==d); -> false
};


exports.common = {
    //singleton
    UserToken:function(){
        return require('../pkg/common/userToken');
    }
    //var a = new pkg.common.UserToken();
    //var b = new pkg.common.UserToken();
    //console.log(a == b); -> true
    //console.log(a.pub_tokens)
    //console.log(a.getTokens())
};




