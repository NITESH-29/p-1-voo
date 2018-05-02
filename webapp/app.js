'use strict';

var SwaggerExpress = require('swagger-express-mw');
var compression = require('compression');
var favicon = require('serve-favicon');
var path = require('path');
console.log("swagger appjs");
var db = require('./db.js');
var utils = require('./api/lib/util');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var cors = require('cors');
var express = require('express');
var app = express();
module.exports = app; // for testing

// compress all responses
app.use(compression());

process.env.NODE_ENV = 'local';

const config = require('./config/config.js').get(process.env.NODE_ENV);

app.use(favicon(path.join(__dirname, 'public/assets/images', 'favicon.png')));

app.use(cors({
    credentials: true,
    origin: true
}));
app.use(cors());

app.use(function(req, res, next) {
        req.config = config;
        req.base_url = req.protocol + '://' + req.get('host');
        next();
    })
    // view engine setup
app.engine('html', function(path, opt, fn) {
    fs.readFile(path, 'utf-8', function(error, str) {
        if (error) return str;
        return fn(null, str);
    });
});
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, './../webui/dist')));

var SwaggerConfig = {
    appRoot: __dirname // required config
};

SwaggerExpress.create(SwaggerConfig, function(err, swaggerExpress) {
    if (err) {
        throw err;
    }

    // All api requests
    app.use(function(req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization');

        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });


    // app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));

    app.use(bodyParser.json({
        limit: '50mb',
        type: 'application/json'
    }));

    //Check to call web services where token is not required//
    app.use('/api/*', function(req, res, next) {
        var freeAuthPath = [
            '/api/updateprofile_pic',
            '/api/register',
            '/api/login',
            '/api/forgotPassword',
            '/api/logOut',
            '/api/activation',
            '/api/resetPassword',
            //Admin url
            '/api/adminLogin',
            '/api/adminLoggedin',
            '/api/adminForgotPassword',
            '/api/adminResetPassword'
        ];
        var available = false;
        for (var i = 0; i < freeAuthPath.length; i++) {
            if (req.baseUrl.indexOf(freeAuthPath[i]) > -1) {
                available = true;
                break;
            }
        }
        if (!available) {
            utils.ensureAuthorized(req, res, next);
        } else {
            next();
        }
    });

    //Multer code for swagger multipart image file limit extend upto 50Mb
    let storage = multer.memoryStorage(); //you might need to change this, check multer docs
    let mult = multer({ //you might need to change this, check multer docs
        storage: storage,
        limits: {
            fileSize: 52428800
        }
    }).fields([{
        name: "file"
    }]);
    app.use(mult);

    // enable SwaggerUI
    app.use(swaggerExpress.runner.swaggerTools.swaggerUi());

    // install middleware
    swaggerExpress.register(app);

    var port = process.env.PORT || config.port;
    app.listen(port).timeout = 1800000; //30 min

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
    }

    app.use(function(req, res, next) {
        return res.render(__dirname + '/views/dist');
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
});