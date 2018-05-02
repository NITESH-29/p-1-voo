'use strict';

var validate = require('./../../config/validate.js');
var constant = require('./../lib/constants.js');
var jwt = require('jsonwebtoken');
var mailer = require('../lib/mailer.js');
var dbObj = require('./../../db.js');
var UserModal = dbObj.UserModal();
var validator = require('validator');
var uuid = require('uuid');

const config = require('../../config/config.js').get(process.env.NODE_ENV);

module.exports = {
    register: register,
    login: login,
    activation: activation,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    logOut: logOut
};

/** 
 * [register - Function is use to register user from mobile App]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function register(req, res) {
    if (req.body && validate.isValid(req.body) && validate.isJSON(req.body)) {
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.type || !req.body.phoneNumber) {
            res.json({
                "code": 402,
                "data": null,
                "message": "Required fields missing."
            });
        } else if (req.body.email && !validator.isEmail(req.body.email)) {
            res.json({
                "code": 402,
                "data": null,
                "message": "Invalid email format."
            });
        } else {
            UserModal.query(req.body.email).exec(function(err, userData) {
                if (err) {
                    res.json({
                        "code": 402,
                        "data": null,
                        "message": "Something went wrong! Please try again."
                    });
                } else if (userData && userData.Items[0]) {
                    res.json({
                        "code": 402,
                        "data": null,
                        "message": "Email already exists."
                    });
                } else {
                    var userId = uuid.v4();                    
                    req.body.id = userId;
                    req.body.email = req.body.email.toLowerCase();
                    if (req.body.password)
                        req.body.password = dbObj.generateHash(req.body.password);
                    var user = new UserModal(req.body);
                    user.save(function(err, result) {
                        if (err) {
                            res.json({
                                "code": 401,
                                "data": null,
                                "message": "Error saving user data"
                            });
                        } else if (result) {
                            var resetDate = new Date().setHours(new Date().getHours() + 1);
                            var reverse_timestamp = new Date().getTime().toString();
                            var hash = dbObj.encryptText(req.body.email + "?=" + resetDate);
                            var baseUrl = config.baseUrl;
                            var userMailData = {
                                userId: req.body.id,
                                email: req.body.email,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                link: baseUrl + '#/verify/' + hash
                            };
                            mailer.sendMail(req.body.email, constant.emailSubjects.signup, constant.emailTemplates.signup, userMailData, function(err, resp) {
                                if (err) {
                                    res.json({
                                        "code": 401,
                                        "data": null,
                                        "message": "Error sending activation email"
                                    });
                                } else {
                                    res.json({
                                        "code": 200,
                                        "data": null,
                                        "message": "User saved successfully! We have sent activation link on email."
                                    });
                                }
                            });
                        }
                    })
                }
            });
        }
    } else {
        res.json({
            "code": 402,
            "data": null,
            "message": "Invalid data format."
        });
    }
}

/**
 * [login - Function is use to login user from mobile App]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function login(req, res) {
    if (!req.body.email || !req.body.password || !req.body.deviceType || !req.body.deviceToken) { //|| !req.body.deviceId
        res.json({
            "code": 402,
            "data": null,
            "message": "Required fields missing."
        });
    } else if (req.body.email && !validator.isEmail(req.body.email)) { //If email entered, check email exists or not
        res.json({
            "code": 402,
            "data": null,
            "message": "Invalid Email Format."
        });
    } else {
        var email = req.body.email.toLowerCase();
        var password = req.body.password || null;
        var lastLoginDate = new Date();
        UserModal.query(email).exec(function(err, result) {
            if (err) {
                res.json({
                    "code": 401,
                    "data": err,
                    "message": "User not found"
                });
            } else if (validate.isValid(result) && validate.isValid(result.Items) && result.Items.length > 0) {
                var userData = JSON.parse(JSON.stringify(result.Items[0]));
                // var expirationDuration = 60 * 60 * 24 * 15; // expiration duration format sec:min:hour:day. ie: 8 Hours as per i/p                
                var jwtToken = jwt.sign(userData.email, config.secret);
                userData.device = {};
                userData.device.token = jwtToken;
                userData.device.lastLoginDate = new Date();
                userData.device.deviceType = req.body.deviceType;
                userData.device.deviceToken = req.body.deviceToken;
                if (req.body.deviceId) {
                    userData.device.deviceId = req.body.deviceId;
                }
                //If user is deleted.
                if (userData.isActive === false || userData.isDeleted === true) {
                    res.json({
                        'code': 401,
                        "data": null,
                        'message': 'Your account is either inactive or does not exists'
                    });
                } else if (validate.isValid(req.body.password) && validate.isValid(userData.password) && dbObj.validPassword(req.body.password, userData.password)) { // if entered password and stored password matches.
                    UserModal.update(userData, function(err, response) {
                        if (err) {
                            res.json({
                                'code': 401,
                                "data": null,
                                'message': 'Something went wrong! Please try again'
                            });
                        } else if (response) {
                            res.json({
                                'code': 200,
                                'data': JSON.parse(JSON.stringify(response)),
                                'message': 'Login successful'
                            });
                        }
                    })
                } else {
                    res.json({
                        'code': 401,
                        "data": null,
                        'message': 'Authentication failed. Check email or password'
                    });
                }
            } else {
                res.json({
                    "code": 401,
                    "data": null,
                    "message": "Incorrect data"
                });
            }
        });
    }
}

/**
 * [forgotPassword - Function is use for forgot password from mobile App]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function forgotPassword(req, res) {
    if (validate.isValid(req.body.email) && validator.isEmail(req.body.email)) {
        //Get response for email or username verification.
        UserModal.query(req.body.email).exec(function(err, userData) {
            if (err) {
                res.json({
                    "code": 401,
                    "data": err,
                    "message": "User not found"
                });
            } else if (validate.isValid(userData) && validate.isValid(userData.Items) && userData.Items.length > 0) {
                var userData = JSON.parse(JSON.stringify(userData.Items[0].attrs));
                var resetDate = new Date().setHours(new Date().getHours() + 1);
                var reverse_timestamp = new Date().getTime().toString();
                var hash = dbObj.encryptText(userData.email + "?=" + resetDate);
                var forgotData = {};
                forgotData.id = userData.id,
                    forgotData.firstName = userData.firstName,
                    forgotData.lastName = userData.lastName,
                    forgotData.email = userData.email,
                    forgotData.resetPasswordToken = hash,
                    forgotData.resetPasswordExpires = resetDate;
                updateUserAndSendForgotPassEmail(forgotData, hash, function(err, response) {
                    if (err) {
                        res.json({
                            "code": 401,
                            "data": err,
                            "message": "Error"
                        });
                    } else {
                        res.json({
                            'code': 200,
                            'message': response,
                            'token': hash
                        });
                    }
                });
            } else {
                res.json({
                    'code': 401,
                    "data": null,
                    'message': 'Incorrect Data'
                });
            }
        })
    } else {
        res.json({
            'code': 401,
            "data": null,
            'message': 'Invalid request'
        });
    }
}

/**
 * To update reset password token and expiration date-time.
 * Send email containing reset password link.
 * @param {object} userData
 * @param {string} hash
 */
function updateUserAndSendForgotPassEmail(userData, hash, callback) {
    if (validate.isValid(userData)) {
        //Update reset password token and expiration date-time into user's data.
        var updateData = {
            id: userData.id,
            email: userData.email,
            resetPasswordToken: userData.resetPasswordToken,
            resetPasswordExpires: userData.resetPasswordExpires
        }
        UserModal.update(updateData, function(err, response) {
            if (err) {
                return callback('Unable to generate token', false);
            } else if (response) {
                var resetDate = new Date().setHours(new Date().getHours() + 1);
                var reverse_timestamp = new Date().getTime().toString();
                var hash = dbObj.encryptText(userData.email + "?=" + resetDate);
                var baseUrl = config.baseUrl;
                var userMailData = {
                    userId: userData.id,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    link: baseUrl + '#/verifyUser/' + hash
                };
                mailer.sendMail(userData.email, constant.emailSubjects.forgotPassword, constant.emailTemplates.forgotPassword, userMailData, function(err, resp) {
                    if (err) {
                        return callback('Unable to send email. Contact support@voozuu.com', false);
                    } else {
                        return callback(null, 'Please check your email for setting new password.');
                    }
                });
            }
        });
    } else {
        return callback("Invalid request", false);
    }
}

/**
 * [resetPassword - Function is use for reset password from mobile App]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function resetPassword(req, res, user_id) {
    if (validate.isValid(req.body) && validate.isValid(req.body.token) && validate.isValid(req.body.password)) {
        var token = req.body.token;
        var password = DB.generateHash(req.body.password);
        var currentDate = new Date().toISOString();
        dbObj.decryptText(token, function(err, data) {
            data = data.split("?=");
            if (data.length !== 0 && validate.isValid(data[0]) && validate.isValid(data[1])) {
                var tokenDate = new Date(parseInt(data[1])).toISOString();
                var email = data[0];
                var currentDate = new Date();
                var queryObj = {
                    email: email,
                    resetPasswordToken: data[1]
                }
                UserModal.query(queryObj).exec(function(err, userData) {
                    if (err) {
                        res.json({
                            'code': 401,
                            "data": null,
                            'message': 'User Not Found'
                        });
                    } else if (validate.isValid(userData) && validate.isValid(userData.Items) && userData.Items.length > 0) {
                        var userData = JSON.parse(JSON.stringify(userData.Items[0]));
                        var reverse_timestamp = new Date().getTime().toString();
                        if (userData.Items[0].resetPasswordToken == token && (userData.Items[0].resetPasswordExpires > currentDate && userData.Items[0].resetPasswordExpires == tokenDate)) {
                            var resetMailData = {};
                            resetMailData.id = userData.Items[0].id,
                                resetMailData.email = userData.Items[0].email,
                                resetMailData.password = password,
                                resetMailData.resetPasswordToken = undefined,
                                resetMailData.resetPasswordExpires = undefined;
                            updateUserAndSendResetPassEmail(resetMailData, function(err, response) {
                                if (err) {
                                    res.json({
                                        "code": 401,
                                        "data": err,
                                        "message": "Error"
                                    });
                                } else {
                                    res.json({
                                        'code': 200,
                                        'data': response,
                                        "message": "success"
                                    });
                                }
                            });
                        } else {
                            res.json({
                                'code': 401,
                                "data": null,
                                'message': 'Invalid expired'
                            });
                        }
                    } else {
                        res.json({
                            'code': 401,
                            "data": null,
                            'message': 'User Not Found'
                        });
                    }
                });
            } else {
                res.json({
                    'code': 401,
                    "data": null,
                    'message': 'Invalid token'
                });
            }
        });
    } else {
        res.json({
            'code': 401,
            "data": null,
            'message': 'Invalid token'
        });
    }
}


/**
 * To update reset password token and expiration date-time.
 * Send email containing reset password link.
 * @param {object} userData
 * @param {string} hash
 */
function updateUserAndSendResetPassEmail(userData, callback) {
    if (validate.isValid(userData)) {
        //Update reset password token and expiration date-time into user's data.

        var updateData = {
            email: userData.email,
            password: userData.password,
            resetPasswordToken: userData.resetPasswordToken,
            resetPasswordExpires: userData.resetPasswordExpires
        }
        UserModal.update(updateData, function(err, userData) {
            if (err) {
                res.json({
                    "code": 401,
                    "data": null,
                    "message": "Unable to find User"
                });
            } else if (userData) {
                mailer.sendMail(userData.email, constant.emailSubjects.resetPassword, constant.emailTemplates.resetPassword, userMailData, function(err, resp) {
                    if (err) {
                        res.json({
                            "code": 401,
                            "data": null,
                            "message": "Error sending reset email"
                        });
                    } else {
                        res.json({
                            "code": 200,
                            "data": null,
                            "message": "You have just reset your password."
                        });
                    }
                });
            }
        });
    } else {
        return callback("Invalid request", false);
    }
}

/**
 * [activation - Function is use for activate user from mobile App]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function activation(req, res) {
    if (validate.isValid(req.swagger.params.token.value)) {
        var token = req.swagger.params.token.value;
        dbObj.decryptText(token, function(err, data) {
            data = data.split("?=");
            if (data.length !== 0 && validate.isValid(data[0]) && validate.isValid(data[1])) {
                var tokenDate = new Date(parseInt(data[1])).toISOString();
                var email = data[0];
                var currentDate = new Date();
                UserModal.query(email).exec(function(err, userData) {
                    if (err) {
                        res.json({
                            'code': 401,
                            "data": null,
                            'message': 'User Not Found'
                        });
                    } else if (validate.isValid(userData) && validate.isValid(userData.Items) && userData.Items.length > 0) {
                        var updateUserData = {
                            id: userData.Items[0].attrs.id,
                            email: userData.Items[0].attrs.email,
                            isActive: true
                        }
                        UserModal.update(updateUserData, function(err, result) {
                            if (err) {
                                res.json({
                                    "code": 401,
                                    "data": null,
                                    "message": "User not found!"
                                });
                            } else if (result) {
                                res.json({
                                    "code": 200,
                                    "data": null,
                                    "message": "Account activated successfully!"
                                });
                            }
                        })
                    }
                })
            }
        })
    }
}

/** 
 * [logOut - Function is use to logout user from mobile App]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function logOut(req, res) {
    if (!req.body.email) {
        res.json({
            "code": 402,
            "data": null,
            "message": "Required fields missing."
        });
    } else if (req.body.email && !validator.isEmail(req.body.email)) {
        res.json({
            "code": 402,
            "data": null,
            "message": "Invalid Email Format."
        });
    } else {
        var email = req.body.email.toLowerCase();
        UserModal.query(email).exec(function(err, result) {
            if (err) {
                res.json({
                    "code": 401,
                    "data": err,
                    "message": "User not found"
                });
            } else if (validate.isValid(result) && validate.isValid(result.Items) && result.Items.length > 0) {
                var userData = JSON.parse(JSON.stringify(result.Items[0]));
                userData.device.token = 'null';
                UserModal.update(userData, function(err, response) {
                    if (err) {
                        res.json({
                            'code': 401,
                            "data": err,
                            'message': 'Something went wrong! Please try again'
                        });
                    } else if (response) {
                        res.json({
                            'code': 200,
                            'data': null,
                            'message': 'User Logged out successfully'
                        });
                    }
                })
            }
        })
    }
}