'use strict';
/*
 * Utility - utility.js
 * Author: smartData Enterprises
 * Date: 3rd Jan 2017
 */
var constant = require('./constants');
const config = require('../../config/config.js').get(process.env.NODE_ENV);

var crypto = require('crypto');
var algorithm = config.cryptoAlgorithm;
var password = config.cryptoPassword;
var nodemailer = require('nodemailer');
var fs = require("fs-extra");
var path = require('path');
var async = require('async');
var FCM = require('fcm-node');
var apn = require('apn');
process.env.DEBUG = 'apn';

var utility = {};

utility.dateToISOStringConvert = function(date) {
    var datearr = date.split("-");    
    var dobj = new Date(parseInt(datearr[2]),parseInt(datearr[1])-1,parseInt(datearr[0]));                      
    date = dobj.toISOString();
    return date;
} 

utility.getEncryptText = function(text) {
    var cipher = crypto.createCipher(algorithm, password);
    text = cipher.update(text, 'utf8', 'hex');
    text += cipher.final('hex');
    return text;
}

utility.getDecryptText = function(text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var text = decipher.update(text, 'hex', 'utf8')
    text += decipher.final('utf8');
    return text;
}

utility.fileExistCheck = function(path, callback) {
    fs.exists(path, function(err) {
        if (err) {
            callback(true);
        } else {
            callback(false);
        }
    });
}

utility.validationErrorHandler = function(err) {
    var errMessage = constant.validateMsg.internalError;
    if (err.errors) {
        for (var i in err.errors) {
            errMessage = err.errors[i].message;
        }
    }
    return errMessage;
}

utility.fileUpload = function(imagePath, buffer) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(path.resolve(imagePath), buffer, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

utility.getSortObj = function(body) {
    var sorting = {createdAt: -1};
    for (var key in body) {
            var reg = new RegExp("sorting", 'gi');
            if (reg.test(key)) {
                var value = body[key];
                key = key.replace(/sorting/g, '').replace(/\[/g, '').replace(/\]/g, '');
                var sorting = {};
                sorting[key] = (value == 'desc') ? 1 : -1;
            }
    }
    return sorting;
}

utility.getFilterObj = function(body) {
    var filter = {};
    for (var key in body) {
            var reg = new RegExp("filter", 'gi');
            if (reg.test(key)) {
                var value = body[key];
                key = key.replace(/filter/g, '').replace(/\[/g, '').replace(/\]/g, '');
                filter[key] = value;
            }
    }
    return filter;
}


var apnError = function(err) { console.log("APN Error:", err);}
var apnOptions = {
    // "cert": path.resolve(__dirname + "./../../config/pem/dev/customer/SWIFTECCert.pem"),
    // "key": path.resolve(__dirname + "./../../config/pem/dev/customer/SWIFTECKey.pem"),
    // "gateway": "gateway.sandbox.push.apple.com",
    // "passphrase": "1234",

    /*"cert": path.resolve(__dirname + "./../../config/pem/live/customer/CertificatesCustCert.pem"),
    "key": path.resolve(__dirname + "./../../config/pem/live/customer/CertificatesCustKey.pem"),    
    "passphrase": "1234",
    "gateway": "gateway.push.apple.com",      //apple      
    // "production"     : true,
    "port": 2195,
    "enhanced": true,
    "cacheLength": 5*/

    
    "cert": path.resolve(__dirname + config.apn.certPath),
    "key": path.resolve(__dirname + config.apn.keyPath),    
    "passphrase": config.apn.passphrase,
    "gateway": config.apn.gateway,
    "port": config.apn.port,
    "enhanced": true,
    "cacheLength": 5,
    //"production"     : true,
};
apnOptions.errorCallback = apnError;


// var deviceToken= "dq27Ym5V0xQ:APA91bFGuHF1VVJHKifnHI-G7ZOkVyRlILgDUVZ0KtAq81BJ5sXTNyd1tlgzAx_p3AiIeBT6Y7-xmMSKygM1fpH8zJCQy4wm2nywzYCyF9UeJD6OhRcwjUtbL_nA5nqyeW4ewJot2oJA";
// var deviceToken= "cKB_8dcA_l0:APA91bHwFGi3SbOLpHuugmmAHQv6t4cRs5rLUNUeInihzwwiy4_xzKf-xn9YLepOb-CltMbhWrSs1os2hSRqil3XqzJcZZq6QfHqiWHXuuFnrqcDEZXnenJSVj8SA-j3cBz0_fVtEzHF";
// var serverKey = config.fcm.ios_serverKey;
// var fcm = new FCM(serverKey);
// var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
//     to: deviceToken,
//     collapse_key: config.fcm.collapseKey,
//     notification: {
//         title: 'LUXsocial',
//         body: 'tes PN from SDN',
//     },
//     data: {'message': 'test msg','notifyType': 'test', 'notifyTypeId': '123456'}
//     // data: obj.payload
// };
// fcm.send(message, function(err, response) {
//     if (err) {
//         console.log("Something has gone wrong!",err);
//     } else {
//         console.log("Successfully sent with response: ", response);            
//     }
// }); 



// utility.sendPushNotification = function(deviceType, deviceToken,  message, payload, notifyType, notifyTypeId ) {
utility.sendPushNotification = function(obj) {
    //console.log('message to ios:- ',deviceToken, message, notifyType, notifyTypeId, userType)
    console.log('---------------------------------------------------------------');
    // console.log("Send notification Type: ",obj.deviceType, " mesage: ",obj.message, "obj: ",obj);
    console.log("Send notification Type: ",obj.deviceType, " mesage: ",obj.message);
    console.log('---------------------------------------------------------------');
    var notifyTypeIdNew = obj.notifyTypeId ? obj.notifyTypeId : '';
    if(obj.deviceToken){
        if(obj.deviceType == 'ios'){
            var serverKey = config.fcm.ios_serverKey;
            var fcm = new FCM(serverKey);
            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: obj.deviceToken,
                collapse_key: config.fcm.collapseKey,
                notification: {
                    title: 'LUXsocial',
                    body: obj.message,
                },
                // data: {'message': message,'notifyType': notifyType, 'notifyTypeId': notifyTypeIdNew}
                data: obj.payload
            };
            fcm.send(message, function(err, response) {
                if (err) {
                    console.log("iOS - Something has gone wrong!",err);
                } else {
                    console.log("iOS - Successfully sent with response: ", response);            
                }
            });            

        }else if(obj.deviceType == 'android'){

            var serverKey = config.fcm.android_serverKey;
            var fcm = new FCM(serverKey);
            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: obj.deviceToken,
                collapse_key: config.fcm.collapseKey,
                notification: {
                    title: 'LUXsocial',
                    body: obj.message,
                },
                // data: {'message': message,'notifyType': notifyType, 'notifyTypeId': notifyTypeIdNew}
                data: obj.payload
            };
            fcm.send(message, function(err, response) {
                if (err) {
                    console.log("Android - Something has gone wrong!",err);
                } else {
                    console.log("Android - Successfully sent with response: ", response);            
                }
            });
        }else{
            console.log("Device type not matched");
        }
    }else{
        console.log("Device token not correct");
    }

};


/*utility.sendPushNotification = function(obj) {
    //console.log('message to ios:- ',deviceToken, message, notifyType, notifyTypeId, userType)
    console.log('---------------------------------------------------------------');
    // console.log("Send notification Type: ",obj.deviceType, " mesage: ",obj.message, "obj: ",obj);
    console.log("Send notification Type: ",obj.deviceType, " mesage: ",obj.message);
    console.log('---------------------------------------------------------------');
    var notifyTypeIdNew = obj.notifyTypeId ? obj.notifyTypeId : '';
    if(obj.deviceToken){
        if(obj.deviceType == 'ios'){
            
            var apnConnection = new apn.Connection(apnOptions);
            var notify = new apn.Notification();
            notify.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
            //notify.badge = 1;
            notify.sound = "ping.aiff";
            notify.alert = obj.message;
            // notify.payload = {'message': message,'notifyType': notifyType, 'notifyTypeId': notifyTypeIdNew};
            notify.payload = obj.payload;
            notify.contentAvailable = true;
            //console.log('notify:- ',notify);
            try {
                var myDevice = new apn.Device(obj.deviceToken);
                if (apnConnection) {
                    apnConnection.pushNotification(notify, myDevice);
                    apnConnection.on('connected', function() {
                        console.log("Connected");
                    });

                    apnConnection.on('transmitted', function(notify, myDevice) {
                        console.log("Notification transmitted to:" + myDevice);                
                    });

                    apnConnection.on('transmissionError', function(errCode, notify, myDevice) {
                        console.error("Notification caused error: " + errCode + " for device ", myDevice, notify);
                    });

                    apnConnection.on('timeout', function() {
                        console.log("Connection Timeout");
                    });

                    apnConnection.on('disconnected', function() {
                        console.log("Disconnected from APNS");
                    });
                }
            } catch (e) {
                console.log("error iphone  ", e);
            }

        }else if(obj.deviceType == 'android'){

            var serverKey = config.fcm.serverKey;
            var fcm = new FCM(serverKey);
            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: obj.deviceToken,
                collapse_key: config.fcm.collapseKey,
                notification: {
                    title: 'LUXsocial',
                    body: obj.message,
                },
                // data: {'message': message,'notifyType': notifyType, 'notifyTypeId': notifyTypeIdNew}
                data: obj.payload
            };
            fcm.send(message, function(err, response) {
                if (err) {
                    console.log("Something has gone wrong!",err);
                } else {
                    console.log("Successfully sent with response: ", response);            
                }
            });
        }else{
            console.log("Device type not matched");
        }
    }else{
        console.log("Device token not correct");
    }

};*/

module.exports = utility;
