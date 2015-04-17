"use strict";
var pkg = require('../pkg/pkg');
var LocalStrategy = pkg.sys.passportLocal.Strategy;

module.exports = function (config,passport) {
    // serialize sessions
    passport.serializeUser(function(user, done) {//保存user对象
        console.log('保存user对象 '+user);
        done(null, user.USER_ID);
    });
    passport.deserializeUser(function(id, done) {//删除user对象
        console.log('删除user对象 '+id);
        var userDao = new pkg.mssqlDao.UserDao();
        userDao.findById(id,function(err,user){
            done(err, user);
        });
    });

    //Use the LocalStrategy within Passport.
    passport.use('login',new LocalStrategy({
            usernameField: 'loginName',
            passwordField: 'password',
            passReqToCallback : true
        },
        function(req,loginName, password, done) {
            if(req.body.remember_me){
                //画面选择了保留一周，改变登陆超时时间为：一周
                req.session.cookie.maxAge = 1000*60*60*24*7;
            }
            process.nextTick(function () {
                var userDao = new pkg.mssqlDao.UserDao();
                userDao.findByLoginName(loginName,function(err,user){
                    if (err) return done(err);
                    if (!user){
                        console.log('User Not Found with loginName '+loginName);
                        return done(null, false, req.flash('error', loginName + ' 不存在.'));
                    }
                    // User exists but wrong password, log the error
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false,req.flash('error', '密码不正确.'));
                    }
                    // User and password both match, return user from
                    // done method which will be treated like success
                    return done(null, user);
                });
            });
        }
    ));
    var isValidPassword = function(user, password){
        return password===(user.PASSWORD);
    };
};