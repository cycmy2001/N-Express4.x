"use strict";
var pkg = require('../../pkg/pkg');
module.exports = function () {

    function userDao() {
    }

    userDao.findById = function (id, callback) {
        var request = new pkg.sys.mssql.Request();
        request.input('userId', pkg.sys.mssql.Int, id);
        request.query('SELECT * FROM SYS_USERS WHERE USER_ID=@userId').then(function (recordSet){
            callback(null, recordSet[0]);
        }).catch(function (err) {
            callback(err, null);
        });
    };
    userDao.findByLoginName = function (loginName, callback) {
        var request = new pkg.sys.mssql.Request();
        request.input('loginName', pkg.sys.mssql.VarChar, loginName);
        request.query('SELECT * FROM SYS_USERS WHERE LOGIN_NAME=@loginName').then(function (recordSet){
            callback(null, recordSet[0]);
        }).catch(function (err) {
            callback(err, null);
        });
    };
    return userDao;
};