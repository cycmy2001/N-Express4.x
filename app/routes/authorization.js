var pkg = require('../pkg/pkg');
exports.hasLogin = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login')
    }
    //next();
};
exports.hasLoginMenu = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render('pages/other/timeout')
    }
    //next();
};
