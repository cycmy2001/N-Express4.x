"use strict";
var pkg = require('../../pkg/pkg');
var basePath = "local";
exports.localIndex = function (req, res) {

    pkg.sys.async.waterfall([
        function (callback) {
            var query = new pkg.mssqlDao.Query();
            var select = query.select('select top 2 ROOM_ID,ROOM_NO from room_account');
            select.then(function (recordSet) {
                callback(null, recordSet);
            }).catch(function (err) {
                callback(err, null);
            });
            //select.then(function(recordset) {
            //    console.log(recordset);
            //}).catch(function(err) {
            //    console.error(err);
            //});
        },
        function (data,callback) {
            console.log(data);
            callback(null,2)

        }
    ], function (err, results) {
        console.log(err);
        console.log(results);
        res.render(basePath + "/index");
    });


    //pkg.sys.async.series({
    //    a: function(callback){
    //        var query = new pkg.mssqlDao.Query();
    //        var select  = query.select('select top 2 ROOM_ID,ROOM_NO from room_account');
    //        select.then(function(recordset) {
    //            callback(null,recordset);
    //        }).catch(function(err) {
    //            callback(err,null);
    //        });
    //        //select.then(function(recordset) {
    //        //    console.log(recordset);
    //        //}).catch(function(err) {
    //        //    console.error(err);
    //        //});
    //    },
    //    b: function(callback){
    //        setTimeout(function(){
    //            callback(null, 1);
    //        }, 5000);
    //    }
    //},function(err,results){
    //    console.log(err);
    //    console.log(results);
    //    res.render(basePath+"/index");
    //});

    //,
    //three: function(callback){
    //    res.render(basePath+"/index");
    //}

    //var query = new pkg.mssqlDao.Query();
    //var select  = query.select('select top 2 ROOM_ID,ROOM_NO from room_account');
    //select.then(function(recordset) {
    //    console.log(recordset);
    //}).catch(function(err) {
    //    console.error(err);
    //});

    //query.select('select top 2 ROOM_ID,ROOM_NO from room_account',function(error,recordset){
    //    console.log(recordset);
    //});

    //query.select('select top 100 * from room_account').then(function(recordset) {
    //    console.log(recordset);
    //}).catch(function(err) {
    //    console.error(err);
    //});

    //select.then(function(recordset) {
    //    console.log(recordset);
    //}).catch(function(err) {
    //    console.error(err);
    //});


    //var request = new pkg.sys.mssql.Request();
    //request.query('select 1 as number', function(err, recordset) {
    //    // ... error checks
    //    console.log(recordset);
    //});

    //var t = new pkg.db.mytest;
    //
    //t.myMethed('s');

    //res.render(basePath+"/index");
};