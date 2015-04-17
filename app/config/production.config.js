"use strict";

module.exports = function (ROOT_PATH) {
    var config = {
        server: {
            port: process.env.PORT || 3001,
            hostname: process.env.HOSTNAME || '127.0.0.1'
        },

        database: {

            mssql: {
                user: 'sa',
                password: 'sa',
                server: '192.168.188.200', // You can use 'localhost\\instance' to connect to named instance
                database: 'LECMISDB13',
                //database: 'CenterData',
                port: 1433,

                //debug: {
                //    packet: true,
                //    data: true,
                //    payload: true,
                //    token: true,
                //    log: true
                //},

                options: {
                    //If you're facing problems with connecting SQL Server 2000
                    //setting the default TDS version to 7_1(default 7_4)
                    tdsVersion:'7_1',
                    encrypt: false // Use this if you're on Windows Azure
                },
                pool: {
                    max: 10,
                    min: 0,
                    idleTimeoutMillis: 30000
                }
            }

        },

        root: ROOT_PATH,
        appinfo: {
            name: '控电房间查询',
            description: '控电房间查询'
        }
    };
    return config;
};
