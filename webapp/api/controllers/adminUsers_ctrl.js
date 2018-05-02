'use strict';

var validate = require('./../../config/validate.js');
var dbObj = require('./../../db.js');
var UserModal = dbObj.UserModal();


module.exports = {
    getAdminUsersList: getAdminUsersList,
    getAdminUserView: getAdminUserView,
    changeUserStatus: changeUserStatus,
    bulkUpdate: bulkUpdate
};

/**
 * [getAdminUsersList - Function is use to get all users list]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function getAdminUsersList(req, res) {
    var limit = req.body.limit;
    var page = req.body.page;
    var filterExpression = '#isDeleted = :isDeleted AND #isActive = :isActive';
    var expressionAttributeValues = {
        ':isDeleted': false,
        ':isActive': true
    };
    var expressionAttributeNames = {
        '#isDeleted': 'isDeleted',
        '#isActive': 'isActive'
    };
    if (req.body.firstName) {
        filterExpression += ' AND begins_with(#firstName,:firstName)';
        expressionAttributeNames['#firstName'] = 'firstName';
        expressionAttributeValues[':firstName'] = req.body.firstName || undefined;
    } else if (req.body.lastName) {
        filterExpression += ' AND begins_with(#lastName,:lastName)';
        expressionAttributeNames['#lastName'] = 'lastName';
        expressionAttributeValues[':lastName'] = req.body.lastName || undefined;
    } else if (req.body.email) {
        filterExpression += ' AND begins_with(#email,:email)';
        expressionAttributeNames['#email'] = 'email';
        expressionAttributeValues[':email'] = req.body.email || undefined;
    }

    UserModal.scan().filterExpression(filterExpression)
        .expressionAttributeValues(expressionAttributeValues)
        .expressionAttributeNames(expressionAttributeNames).limit(limit)
        .exec(function (err, userData) {
            if (err) {
                res.json({
                    "code": 402,
                    "data": null,
                    "message": "No record found!"
                });
            } else {
                var model = UserModal.scan().filterExpression(filterExpression)
                    .expressionAttributeValues(expressionAttributeValues)
                    .expressionAttributeNames(expressionAttributeNames);
                var data = JSON.parse(JSON.stringify(userData));
                var allUserArr = [];
                if (validate.isValid(data) && validate.isValid(data.Items) && data.Items.length > 0) {
                    data.Items.forEach(function (eachUser) {
                        allUserArr.push(eachUser);
                    });
                    if (validate.isValid(data.LastEvaluatedKey) && validate.isValid(data.LastEvaluatedKey.id)) {
                        getPaginatedData(model, limit, page, data.LastEvaluatedKey, allUserArr, function (err, response, dataLen) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    "code": 401,
                                    "data": err,
                                    "message": "Not Found!"
                                });
                            } else {
                                res.json({
                                    "code": 200,
                                    "data": response,
                                    "count": dataLen,
                                    "message": "Users fetched successfully!"
                                });
                            }
                        });
                    } else {
                        res.json({
                            "code": 200,
                            "data": allUserArr,
                            "message": "Users fetched successfully!"
                        });
                    }
                } else {
                    res.json({
                        "code": 200,
                        "data": null,
                        "message": "No record found!"
                    });
                }
            }
        })
}


function getPaginatedData(model, limit, page, LastEvaluatedKey, allUserArr, callback) {
    if (validate.isValid(model)) {
        if (validate.isValid(limit) && validate.isValid(page)) {
            var iterateCount = 2;
            userBasedOnlimitAndOffset(model, limit, page, LastEvaluatedKey, iterateCount, allUserArr, function (err, response) {
                if (err) {
                    callback(err, false);
                } else {
                    var startIndex = limit * (page - 1);
                    var endIndex = (limit * page) - 1;
                    var dataArray = [];
                    for (var i = startIndex; i <= endIndex; i++) {
                        if (validate.isValid(response[i])) {
                            dataArray.push(response[i]);
                        }
                    }
                    callback(null, dataArray, response.length);
                }
            });
        }
    }
}

function userBasedOnlimitAndOffset(model, limit, page, lastEvaluatedKey, iterateCount, allUserArr, callback) {
    if (validate.isValid(model) && validate.isValid(lastEvaluatedKey) && validate.isValid(lastEvaluatedKey.id)) {
        model.startKey(lastEvaluatedKey);
        model.exec(function (err, allUsers) {
            if (err) {
                console.log(err);
                callback("Unable to fetch users!!", false);
            } else {
                var allUsers = JSON.parse(JSON.stringify(allUsers));
                if (validate.isValid(allUsers.LastEvaluatedKey) && validate.isValid(allUsers.LastEvaluatedKey.id) && allUsers.Items.length == 0) {
                    userBasedOnlimitAndOffset(model, limit, page, allUsers.LastEvaluatedKey, iterateCount, allUserArr, callback);
                } else if (validate.isValid(allUsers.LastEvaluatedKey) && validate.isValid(allUsers.LastEvaluatedKey.id) && allUsers.Items.length !== 0) {
                    userBasedOnlimitAndOffset(model, limit, page, allUsers.LastEvaluatedKey, iterateCount, allUserArr, callback);
                    allUsers.Items.forEach(function (eachUser) {
                        allUserArr.push(eachUser);
                    });
                } else {
                    allUsers.Items.forEach(function (eachUser) {
                        allUserArr.push(eachUser);
                    });
                    callback(null, allUserArr);
                }
            }
        });
    } else {
        callback("Missing data!!", false);
    }
}
/**
 * [getAdminUserView - get User information using id]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function getAdminUserView(req, res) {
    if (validate.isValid(req.swagger.params.userId) && validate.isValid(req.swagger.params.userId.value)) {
        UserModal.query(req.swagger.params.userId.value).exec(function (err, data) {
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
                        "message": "User fetched successfully",
                        "data": JSON.parse(JSON.stringify(data.Items[0]))
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
 * [changeUserStatus - change User status using id]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function changeUserStatus(req, res) {
    if (validate.isValid(req.body.id)) {
        UserModal.update(req.body, function (err, response) {
            if (err) {
                res.json({
                    "code": 401,
                    "data": null,
                    "message": "Something went wrong! Please try again."
                });
            } else if (response) {
                res.json({
                    'code': 200,
                    'data': JSON.parse(JSON.stringify(response)),
                    'message': 'User updated successfully!'
                });
            }
        })
    } else {
        res.json({
            "code": 401,
            "data": null,
            "message": " User ID is missing."
        });
    }
}

/**
 * [bulkUpdate - change multiple Users status using id]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function bulkUpdate(req, res) {
    if (req.body && validate.isValid(req.body)) {
        var usersLen = req.body.length;
        req.body.forEach(function (item, index) {
            var delData = {};
            delData.email = item.email;
            delData.id = item.id;
            if (item.field == 'isDeleted')
                delData.isDeleted = item.status;
            else
                delData.isActive = item.status
            if (delData) {
                UserModal.query(item.email).exec(function (err, results) {
                    if (err) {
                        console.log(err);
                        if (index === usersLen - 1) {
                            res.json({
                                "code": 401,
                                "data": null,
                                "message": "Unable to update users."
                            });
                        }
                    } else {
                        var resp_data = JSON.parse(JSON.stringify(results.Items));
                        if (resp_data && resp_data.length !== 0) {
                            UserModal.update(delData, function (err, resp) {
                                if (err) {
                                    if (index === usersLen - 1) {
                                        res.json({
                                            "code": 401,
                                            "data": null,
                                            "message": " User ID is missing."
                                        });
                                    }
                                } else {
                                    if (index === usersLen - 1) {
                                        res.json({
                                            "code": 401,
                                            "data": null,
                                            "message": "Users updated successfully."
                                        });
                                    }
                                }
                            });
                        } else {
                            if (index === usersLen - 1) {
                                res.json({
                                    "code": 401,
                                    "data": null,
                                    "message": "User not found."
                                });
                            }
                        }
                    }
                })
            } else {
                if (index === usersLen - 1) {
                    res.json({
                        "code": 401,
                        "data": null,
                        "message": "User ID is missing."
                    });
                }
            }
        });
    } else {
        res.json({
            "code": 402,
            "data": null,
            "message": "Invalid data format."
        });
    }
}