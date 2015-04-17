"use strict";

module.exports = function (config, mssql,callback) {
    callback = callback || function () {};
    mssql.connect(config.database.mssql, function(err){
        callback(err,'Db has been connected')
    });
};