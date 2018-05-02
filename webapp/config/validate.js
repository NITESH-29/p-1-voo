'use strict';

var DB = require('../db.js');
var vogels = require('vogels');
var AWS = require('./resources.js');
var S3 = new vogels.AWS.S3({apiVersion: AWS.S3.apiVersion, endpoint: AWS.S3.endpoint});
module.exports = {
    isValid: isValid,
    isJSON: isJSON,
    isValidObject: isValidObject,
    verifyBucket : verifyBucket,
    emailvalidation : emailvalidation,
    phonevalidation : phonevalidation
};

/* @function : isValid
 * @param    : data {string}
 * @created  : 06022016
 * @modified : 06022016
 * @purpose  : To validate provided data
 * @return   : 401 or 401 or 200
 * @public   
 */
function isValid(data) {
    if (data && data !== null && data !== undefined) {
        return true;
    } else {
        return false;
    }
}

/* @function : isValidObject
 * @param    : _Object {object}
 * @created  : 24022016
 * @modified : 06022016
 * @purpose  : To validate provided data
 * @return   : 401 or 401 or 200
 * @public   
 */
function isValidObject(_Object) {
    if (isJSON(_Object)) {
        for (var obj in _Object) {
            if (isJSON(_Object[obj])) {
                for (var _arr in _Object[obj]) {
                    if (_Object[obj][_arr] === null || _Object[obj][_arr] === '')
                        delete _Object[obj][_arr];
                }
                if (!isJSON(_Object[obj]))
                    delete _Object[obj];
            } else {
                if (_Object[obj] === null || _Object[obj] === '')
                    delete _Object[obj];
                if (Array.isArray(_Object[obj]) && _Object[obj].length == 0)
                    delete _Object[obj];
            }
        }
    }
    return _Object;
}

function isJSON(_obj) {
    var _has_keys = 0;
    for (var _pr in _obj) {
        if (_obj.hasOwnProperty(_pr) && !(/^\d+$/.test(_pr))) {
            _has_keys = 1;
            break;
        }
    }
    return (_has_keys && _obj.constructor == Object && _obj.constructor != Array) ? 1 : 0;
}


function verifyBucket(name, callback) {
    S3.createBucket({Bucket: name}, function(err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, true);
        }
    });
}

/* @function : emailvalidation
 * @param    : response {object}, data {object}
 * @created  : 20052016
 * @modified : 20052016
 * @purpose  : to validate email
 */
function emailvalidation(email, callback) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var testresult = re.test(email);
    if (testresult == true) {
        callback(null, testresult);
    }
    else {
        callback(true, "Invalid email address");
    }
}

/* @function : phonevalidation
 * @param    : response {object}, data {object}
 * @created  : 20052016
 * @modified : 20052016
 * @purpose  : to validate phone
 */
function phonevalidation(phone, callback) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/;
    if (phone.match(phoneno))
    {
        callback(null, true)
    }
    else
    {
        callback(true, "Invalid phone number");
    }
}
