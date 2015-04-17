var pkg = require('./app/pkg/pkg');
var path     = pkg.sys.path;
var express  = pkg.sys.express;
var config   = require(__dirname + '/app/config/config');
var app      = express();
app.config = config;

//依赖执行
pkg.sys.async.auto({

    connectDb: function(callback){
        require('./app/database/mssql-database')(config, pkg.sys.mssql,callback);
    },
    passport:['connectDb', function(callback){
        require('./app/config/passport')(config, pkg.sys.passport);
        callback(null,'passport initial.')
    }],
    initialExpress: ['passport', function(callback){
        require('./app/config/express')(app, express,pkg.sys.passport);
        callback(null,"express initial.")
    }]
}, function(err, results) {
    if(err){
        var content = {
            user: config.database.mssql.user,
            password: config.database.mssql.password,
            database: config.database.mssql.database,
            port: config.database.mssql.port
        };
        console.log('============ db can not connect ==========');
        console.error(content);
        console.error(err);
        process.exit(1);
    }else{
        console.log(results);
        app.listen(app.get('port'), function() {
            console.log("\n Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
        });
        app.on('error',onError);
        app.on('listening',onListening);

        //var userDao = new pkg.mssqlDao.UserDao();
        //userDao.findByLoginName('admin',function(err,user){
        //    console.log(user.USER_ID)
        //})
    }
});
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = app;

