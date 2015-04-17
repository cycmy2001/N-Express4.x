var pkg = require('../pkg/pkg');
var Route = pkg.sys.express.Router();
var auth = require('./authorization');
var action = require('./action/localAction');

// Frontend routes
Route
    .get('/',auth.hasLogin,function(req,res){
        res.render("index");
    })
    .get('/login',function(req,res){
        res.render("pages/login");
    })
    .post('/login',pkg.sys.passport.authenticate('login', {successRedirect:'/',failureRedirect: '/login',failureFlash : true}))

    .get('/logout',function(req,res){
        req.logout();
        res.redirect('/');
    })
    .get('/home',auth.hasLoginMenu,function(req,res){
        res.render("pages/home");
    })
    .get('/menu/:dir/:page',auth.hasLoginMenu,menuNavMiddleware,function(req,res){
        var dir = req.params.dir;
        var page = req.params.page;
        res.render('pages/'+dir+'/'+page);
    });

    function menuNavMiddleware(req,res,next){
        var arg = pkg.sys.url.parse(req.url, true).query;//arg => { aa: '001', bb: '002' }
        var nav = arg.nav;
        var menuNavItem=[];
        if(nav){
            menuNavItem = pkg.sys.lodash.words(nav, /[^,]+/g);
        }
        res.locals.menuNavItem =menuNavItem;
        next();
    }

module.exports = Route;