'use strict';

var jwt = require('jsonwebtoken');
var dbObj = require('./../../db.js');
var UserModal = dbObj.UserModal();
process.env.NODE_ENV = "local";

const config = require('../../config/config.js').get(process.env.NODE_ENV);

module.exports = {
    ensureAuthorized: ensureAuthorized
}

function ensureAuthorized(req, res, next) {
    var unauthorizedJson = {
        code: 402,
        'message': 'Unauthorized',
        data: {}
    };
    var token = req.headers["authorization"] || req.query["api_key"];

    if (typeof token !== 'undefined') {
        var splitToken = token.split(' ');
        try {
            token = splitToken[1];
            if (splitToken[0] == 'Bearer') { // For API authentication                
                if (config.secret) {
                    jwt.verify(splitToken[1], config.secret, function(err, admin) {
                        if (err) {
                            console.log(err);
                            res.json({
                                status: req.config.statusCode.unauthorized,
                                error: err,
                                message: 'Invalid Token'
                            });
                        } else {
                            next();
                        }
                    })
                } else {
                    res.json({
                        status: req.config.statusCode.serviceUnavailable,
                        error: err,
                        message: "Service is temporarily unavailable"
                    });
                }
            }
        } catch (err) {
            res.json(unauthorizedJson);
        }
    } else {
        res.json(unauthorizedJson);
    }
}