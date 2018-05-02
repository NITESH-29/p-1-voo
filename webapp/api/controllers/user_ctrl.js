'use strict';
var util = require('util');
var validate = require('./../../config/validate.js');
var common = require('./../../config/common.js');
var jwt = require('jsonwebtoken');
var AWS = require('./../../config/resources.js');
var dbObj = require('./../../db.js');
var CryptoJS = require("crypto-js");
var util = require('util');
var dbObj = require('./../../db.js');
var UserModal = dbObj.UserModal();
var validator = require('validator');
var uuid = require('uuid');
var userId = uuid.v4();
module.exports = {
    getUserInfo: getUserInfo
};
/**
 * [getUserInfo - get User information using email]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function getUserInfo(req, res) {
    if (validate.isValid(req.swagger.params.userId) && validate.isValid(req.swagger.params.userId.value)) {
        UserModal.query(req.swagger.params.userId.value).exec(function(err, data) {
            if (err) {
                res.json({
                    'code': 401,
                    "data": null,
                    'message': "Invalid User ID."
                });
            } else {
                if (validate.isValid(data) && data.length !== 0) {
                    res.json({
                        "code": 200,
                        "message": "successfully fetched.",
                        "user": data
                    });
                } else {
                    res.json({
                        "code": 401,
                        "data": null,
                        "message": "User not found."
                    });
                }
            }
        });
    } else {
        res.json({
            "code": 401,
            "data": null,
            "message": " User ID is missing."
        });
    }
}