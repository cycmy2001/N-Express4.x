"use strict";
var pkg = require('../pkg/pkg');
module.exports = function (app, express,passport) {
    // settings
    app.set('env', pkg.sys.nodeEnv);
    app.set('port', app.config.server.port);

    // use ejs-locals for all ejs templates:
    app.engine('ejs', pkg.sys.ejsLocalsEngine);
    app.set('view engine', 'ejs');
    app.set('views', pkg.sys.path.join(app.config.root, 'app/views'));
    app.enable('trust proxy');
    app.disable('x-powered-by');
    // Express use middlewares
    //app.use(pkg.sys.favicon(app.config.root + '/public/favicon.ico'));

    //cache static elements example:css,js
    var oneYear = 31557600000;
    app.use(express.static(pkg.sys.path.normalize(app.config.root + '/public'), { maxAge: oneYear }));

    if (pkg.sys.nodeEnv === 'development') {
        app.use(pkg.sys.morgan('dev'));
    } else {
        app.use(pkg.sys.morgan('combined', {
            skip: function (req, res) {
                return res.statusCode < 400
            },
            stream: pkg.sys.fs.createWriteStream(app.config.root + '/access.log', {flags: 'a'})
        }));
    }
    app.use(pkg.sys.bodyParser.urlencoded({extended: true}));
    app.use(pkg.sys.bodyParser.json());
    app.use(pkg.sys.multer());
    app.use(pkg.sys.expressValidator());
    //app.use(pkg.sys.cookieParser());
    app.use(pkg.sys.methodOverride());

    var sess = {
        name: [pkg.sys.packageJson.name, 'sid'].join('.'),
        resave: false,
        saveUninitialized: true,
        secret: pkg.sys.packageJson.name,
        genid: function(req) {
            return pkg.sys.uuid.v4(); // use UUIDs for session IDs
        },
        //默认登陆后24小时后超时。
        cookie: {
            maxAge:1000*60*60*24
        }
    };
    app.use(pkg.sys.expressSession(sess));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(pkg.sys.expressFlash());
    app.use(pkg.middleware.views_helper(pkg.sys.packageJson.name));
    app.use(function (req, res, next) {
        res.locals.appinfo      = app.config.appinfo;
        res.locals.NODE_ENV = pkg.sys.nodeEnv;
        res.locals.moment   = pkg.sys.moment;
        res.locals.lodash   = pkg.sys.lodash;
        res.locals.menuNavItem   = [];
        if(pkg.sys.lodash.isObject(req.user)) {
            res.locals.loginUser = req.user
        }else{
            res.locals.loginUser={};
        }
        next();
    });

    /** ROUTES Apps */
    app.use('/',pkg.routes.local);

    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(pkg.sys.responseTime());
    } else {
        app.use(pkg.sys.compression({
            filter: function (req, res) {
                return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
            },
            level: 9
        }))
    }

    if (pkg.sys.nodeEnv === 'development') {

        app.use(pkg.sys.errorHandler());

    } else {
        app.use(function logErrors(err, req, res, next) {
            if (err.status === 404) {
                return next(err)
            }
            console.error(err.stack);
            next(err);
        });

        app.use(function respondError(err, req, res, next) {
            var status, message;

            status = err.status || 500;
            res.status(status);

            message = ((err.productionMessage && err.message) ||  err.customProductionMessage);
            if (!message) {
                if (status === 403) {
                    message = 'Not allowed';
                } else {
                    message = 'Oops, there was a problem!';
                }
            }

            if (req.accepts('json')) {
                res.send({error: message});
                return;

            } else {
                res.type('txt').send(message + '\n');
                return;
            }

        });

    }
};
