'use strict';

var jwt = require('jsonwebtoken');
var validate = require('./../../config/validate.js');
var constant = require('./../lib/constants.js');
var mailer = require('../lib/mailer.js');
var dbObj = require('./../../db.js');
var UserModal = dbObj.UserModal();
var validator = require('validator');
var moment = require('moment');

const config = require('../../config/config.js').get(process.env.NODE_ENV);

module.exports = {
    adminLoggedin: adminLoggedin,
    adminLogin: adminLogin,
    getAdminById: getAdminById,
    adminChangePassword: adminChangePassword,
    // adminProfileUpdate: adminProfileUpdate,
    // adminUpdateImage: adminUpdateImage,
    adminForgotPassword: adminForgotPassword,
    adminResetPassword: adminResetPassword
};


/**
 * [adminLoggedin - Function is use to check admin login status]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function adminLoggedin(req, res) {
    if (req.headers && req.headers.authorization) { // success callback for the Authentication
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            jwt.verify(parts[1], config.secret, function(err, admin) {
                if (err) {
                    res.json({
                        "code": 401,
                        "data": err,
                        "message": "Authentication failed!"
                    });
                } else {
                    if (admin) {
                        var adminObj = {
                            email: admin.email,
                            id: admin.id,
                            isDeleted: false,
                            isActive: true
                        }
                        UserModal.query(adminObj).exec(function(err, adminData) {
                            if (err) {
                                res.json({
                                    "code": 401,
                                    "data": err,
                                    "message": "Admin not found"
                                });
                            } else if (validate.isValid(admin) && validate.isValid(admin.Items) && admin.Items.length > 0) {
                                res.json({
                                    "code": 200,
                                    "data": JSON.parse(JSON.stringify(adminData)),
                                    "message": "Authorized"
                                });
                            }
                        })
                    } else {
                        res.json({
                            "code": 401,
                            "data": err,
                            "message": "Admin not found"
                        });
                    }
                }
            });
        } else {
            res.json({
                "code": 401,
                "data": err,
                "message": "Authentication failed!"
            });
        }
    } else {
        res.json({
            "code": 401,
            "data": err,
            "message": "Authentication failed!"
        });
    }
}

/**
 * [adminLogin - Function is use for admin login]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function adminLogin(req, res) {    
    if (validator.isNull(req.body.email) || !req.body.email) {
        res.json({
            "code": 402,
            "data": err,
            "message": "Email is required"
        });
    } else if (req.body.email && !validator.isEmail(req.body.email)) {
        res.json({
            "code": 402,
            "data": err,
            "message": "Invalid Email format"
        });
    } else if (validator.isNull(req.body.password) || !req.body.password) {
        res.json({
            "code": 402,
            "data": err,
            "message": "Password is required"
        });
    } else {
        UserModal.query(req.body.email.toLowerCase()).filter('isDeleted').equals(false).filter('isActive').equals(true).exec(function(err, admin) {
            if (err) {
                console.log("err", err)
                res.json({
                    "code": 401,
                    "data": err,
                    "message": "Admin not found"
                });
            } else if (validate.isValid(admin) && validate.isValid(admin.Items) && admin.Items.length > 0) {
                var adminData = admin.Items[0].attrs;
                var expirationDuration = 60 * 60 * 24 * 15; // expiration duration format sec:min:hour:day. ie: 8 Hours as per i/p
                var jwtToken = jwt.sign({
                    uid: admin.id
                }, config.secret, {
                    expiresIn: expirationDuration
                });
                if (adminData.isActive === false || adminData.isDeleted === true) {
                    res.json({
                        'code': 401,
                        "data": null,
                        'message': 'Your account is either inactive or does not exists'
                    });
                } else if (validate.isValid(req.body.password) && validate.isValid(adminData.password) && dbObj.validPassword(req.body.password, adminData.password)) { // if entered password and stored password matches.
                    var updateAdminData = {
                        id: adminData.id,
                        email: adminData.email,
                        token: jwtToken,
                        lastLoginDate: new Date()
                    }
                    UserModal.update(updateAdminData, function(err, response) {
                        if (err) {
                            return callback('Unable to generate token', false);
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
                    "message": "Authentication failed. Check email or password"
                });
            }

        });


    }
}

/**
 * [adminForgotPassword - Function is use for admin forgot password]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function adminForgotPassword(req, res) {
    if (validator.isNull(req.body.email) || !req.body.email) {
        res.json({
            "code": 402,
            "data": err,
            "message": "Email is required"
        });
    } else if (req.body.email && !validator.isEmail(req.body.email)) {
        res.json({
            "code": 402,
            "data": err,
            "message": "Invalid Email format"
        });
    } else {
        UserModal.query(req.body.email).filter('isDeleted').equals(false).filter('isActive').equals(true).exec(function(err, userData) {
            if (err) {
                res.json({
                    "code": 401,
                    "data": err,
                    "message": "User not found"
                });
            } else if (validate.isValid(userData) && validate.isValid(userData.Items) && userData.Items.length > 0) {
                var userData = JSON.parse(JSON.stringify(userData)).Items[0];
                var resetDate = new Date().setHours(new Date().getHours() + 1);
                var reverse_timestamp = new Date().getTime().toString();
                var hash = dbObj.encryptText(userData.email + "?=" + resetDate);
                var updateData = {
                    id: userData.id,
                    email: userData.email,
                    resetPasswordToken: hash,
                    resetPasswordExpires: resetDate
                }
                UserModal.update(updateData, function(err, response) {
                    if (err) {
                        res.json({
                            "code": 401,
                            "data": err,
                            "message": "Unable to generate token"
                        });
                    } else if (response) {
                        var baseUrl = config.baseUrl;
                        var userMailData = {
                            userId: userData.id,
                            email: userData.email,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            link: baseUrl + 'admin/#/reset-password/' + hash
                        };
                        mailer.sendMail(userData.email, constant.emailSubjects.forgotPassword, constant.emailTemplates.forgotPassword, userMailData, function(err, resp) {
                            if (err) {
                                res.json({
                                    "code": 401,
                                    "data": err,
                                    "message": "Unable to send email. Contact support@voozuu.com"
                                });
                            } else {
                                res.json({
                                    "code": 200,
                                    "data": null,
                                    "message": "Please check your email for setting new password"
                                });
                            }
                        });
                    }
                });
            } else {
                res.json({
                    'code': 401,
                    "data": null,
                    'message': 'Incorrect Email'
                });
            }
        })
    }
}

/**
 * [adminResetPassword - Function is use for admin reset password]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function adminResetPassword(req, res) {
    if (validate.isValid(req.body) && validate.isValid(req.body.resetKey) && validate.isValid(req.body.password)) {
        var token = req.body.resetKey;
        var password = dbObj.generateHash(req.body.password);
        var currentDate = new Date().toISOString();
        dbObj.decryptText(token, function(err, data) {
            data = data.split("?=");
            if (data.length !== 0 && validate.isValid(data[0]) && validate.isValid(data[1])) {
                var tokenDate = new Date(parseInt(data[1])).toISOString();
                var email = data[0];
                var currentDate = new Date();
                UserModal.query(email).filter('isDeleted').equals(false).filter('isActive').equals(true).exec(function(err, userData) {
                    if (err) {
                        res.json({
                            'code': 401,
                            "data": err,
                            'message': 'User Not Found'
                        });
                    } else if (validate.isValid(userData) && validate.isValid(userData.Items) && userData.Items.length > 0) {
                        var userData = JSON.parse(JSON.stringify(userData.Items[0]));
                        var reverse_timestamp = new Date().getTime().toString();
                        if (userData.resetPasswordToken == token && moment(userData.resetPasswordExpires).isAfter(currentDate) && moment(userData.resetPasswordExpires).isSame(tokenDate)) {
                            var updateData = {
                                email: userData.email,
                                id: userData.id,
                                password: userData.password,
                                resetPasswordToken: '',
                                resetPasswordExpires: ''
                            }
                            UserModal.update(updateData, function(err, userData) {
                                if (err) {
                                    res.json({
                                        "code": 401,
                                        "data": err,
                                        "message": "Unable to find Admin"
                                    });
                                } else if (userData) {
                                    var userMailData = {
                                        userId: userData.id,
                                        email: userData.email,
                                        firstName: userData.firstName,
                                        lastName: userData.lastName
                                    };
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
 * [getAdminById - Function is use to get admin details]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function getAdminById(req, res) {
    if (validate.isValid(req.swagger.params.userId) && validate.isValid(req.swagger.params.userId.value)) {
        UserModal.query(req.swagger.params.userId.value).filter('isDeleted').equals(false).filter('isActive').equals(true).exec(function(err, data) {
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

/**
 * [adminChangePassword - Function is use to change admin password]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function adminChangePassword(req, res) {
    if (validator.isValid(req.headers) && validator.isValid(req.headers.authorization)) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length === 2) {
            jwt.verify(parts[1], config.secret, function(err, admin) {
                if (err || !user) {
                    res.jsonp({
                        'status': 'failure',
                        'messageId': 401,
                        'message': 'Authentication failed!'
                    });
                } else if (validate.isValid(req.body.oldPassword) && validate.isValid(admin.password) && dbObj.validPassword(req.body.oldPassword, admin.password)) { // if old password and new password matches.
                    var updateData = {
                        email: admin.email,
                        id: admin.id,
                        password: admin.password,
                        resetPasswordToken: undefined,
                        resetPasswordExpires: undefined
                    }
                    UserModal.update(updateData, function(err, updatePass) {
                        if (err) {
                            res.json({
                                "code": 401,
                                "data": null,
                                "message": "Unable to find User"
                            });
                        } else if (updatePass) {
                            if (err) {
                                res.json({
                                    "code": 401,
                                    "data": null,
                                    "message": "Error in change password"
                                });
                            } else {
                                res.json({
                                    "code": 200,
                                    "data": null,
                                    "message": "Password changed Successfully"
                                });
                            }
                        }
                    });

                } else {
                    res.json({
                        "code": 401,
                        "data": err,
                        "message": "Authentication failed!"
                    });
                }
            })
        }
    }
}