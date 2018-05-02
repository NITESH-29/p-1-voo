'use strict';

var validate = require('./../../config/validate.js');
var dbObj = require('./../../db.js');
var UserModal = dbObj.UserModal();
var TagModal = dbObj.TagModal();
var GroupModal = dbObj.GroupModal();
var MessageModal = dbObj.MessageModal();
var validator = require('validator');
var async = require('async');
var underscore = require('underscore');
var moment = require('moment');

module.exports = {
    getAdminDashboardCount: getAdminDashboardCount,
    getAdminDashboardGraphCount: getAdminDashboardGraphCount,
    getAdminDashboardRecentUsersList: getAdminDashboardRecentUsersList,
    getAdminDashboardRecentActivitiesList: getAdminDashboardRecentActivitiesList
};

/**
 * [getAdminDashboardCount - Function is use to get Dashboard statistics count]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function getAdminDashboardCount(req, res) {
    async.series({
        usersData: function(callback) {
            UserModal.scan().where('type').equals("user").exec(function(err, result) {
                if (err) {
                    callback(err, null)
                } else if (validate.isValid(result)) {
                    callback(null, JSON.parse(JSON.stringify(result.Count)))
                }
            });
        },
        tagsData: function(callback) {
            TagModal.scan().exec(function(err, result) {
                if (err) {
                    callback(err, null)
                } else if (validate.isValid(result)) {
                    callback(null, JSON.parse(JSON.stringify(result.Count)))
                }
            });
        },
        groupsData: function(callback) {
            GroupModal.scan().exec(function(err, result) {
                if (err) {
                    callback(err, null)
                } else if (validate.isValid(result)) {
                    callback(null, JSON.parse(JSON.stringify(result.Count)))
                }
            });
        },
        activitiesData: function(callback) {
            MessageModal.scan().exec(function(err, result) {
                if (err) {
                    callback(err, null)
                } else if (validate.isValid(result)) {
                    callback(null, JSON.parse(JSON.stringify(result.Count)))
                }
            });
        },
    }, function(err, result) {
        if (err) {
            console.log("err", err);
        } else {
            res.json({
                "code": 200,
                "data": JSON.parse(JSON.stringify(result)),
                "message": "Dashboard data fetched successfully!"
            });
        }
    });
}


/**
 * [getRecentUsers - Function is use to get recent users list]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function getAdminDashboardRecentUsersList(req, res) {
    UserModal.scan().where('type').equals("user").limit(10).attributes(['id', 'firstName', 'lastName', 'createdAt']).exec(function(err, userData) {
        if (err) {
            res.json({
                "code": 402,
                "data": null,
                "message": "No record found!"
            });
        } else if (userData && userData.Items.length > 0) {
            res.json({
                "code": 200,
                "data": JSON.parse(JSON.stringify(userData.Items)),
                "message": "Users fetched successfully!"
            });
        } else {
            res.json({
                "code": 200,
                "data": null,
                "message": "No Record Found!"
            });
        }
    })
}

/**
 * [getAdminDashboardCount - Function is use to get Dashboard statistics count]
 * @param  {object}  
 * @param  {object} 
 * @return {object} 
 */
function getAdminDashboardRecentActivitiesList(req, res) {
    MessageModal.scan().limit(10).attributes(['message', 'createdAt']).exec(function(err, userData) {
        if (err) {
            res.json({
                "code": 402,
                "data": null,
                "message": "No record found!"
            });
        } else if (userData && userData.Items.length > 0) {
            res.json({
                "code": 200,
                "data": JSON.parse(JSON.stringify(userData.Items)),
                "message": "Users fetched successfully!"
            });
        } else {
            res.json({
                "code": 200,
                "data": null,
                "message": "No Record Found!"
            });
        }
    })
}

/**
 * [getAdminDashboardGraphCount Get statistics count data for graph]
 * @param  {object} req
 * @param  {object} res
 * @return {json}
 */
function getAdminDashboardGraphCount(req, res) {
    var date = new Date();
    var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    async.parallel({
            users: function(callback) {
                UserModal.scan().where('type').equals("user").where('createdAt').gte(startDate)
                    .where('createdAt').lte(endDate).exec(function(err, result) {
                        if (err) {
                            callback(err, null)
                        } else if (validate.isValid(result)) {
                            callback(null, JSON.parse(JSON.stringify(result.Items)))
                        }
                    });
            },
            tags: function(callback) {
                TagModal.scan().where('createdAt').gte(startDate)
                    .where('createdAt').lte(endDate).exec(function(err, result) {
                        if (err) {
                            callback(err, null)
                        } else if (validate.isValid(result)) {
                            callback(null, JSON.parse(JSON.stringify(result.Items)))
                        }
                    });
            },
            groups: function(callback) {
                GroupModal.scan().where('createdAt').gte(startDate)
                    .where('createdAt').lte(endDate).exec(function(err, result) {
                        if (err) {
                            callback(err, null)
                        } else if (validate.isValid(result)) {
                            callback(null, JSON.parse(JSON.stringify(result.Items)))
                        }
                    });
            }
        },
        function(err, results) {
            var linechart = [];
            var rangeIndex = 10;
            var records = [];
            underscore.each(results, function(value, key) {
                underscore.each(value, function(val, ky) {
                    records.push(val);
                });
                results[key] = value.length;
            });

            var groupedByData = underscore.groupBy(records, function(item) {
                return item.createdAt.toString().substring(0, rangeIndex);
            });

            // console.log("groupedByData", groupedByData);
            var sortKeysBy = function(obj, comparator) {
                var keys = underscore.sortBy(underscore.keys(obj), function(key) {
                    return comparator ? comparator(obj[key], key) : key;
                });

                return underscore.object(keys, underscore.map(keys, function(key) {
                    return obj[key];
                }));
            };

            var orderByData = sortKeysBy(groupedByData);

            for (var ky in orderByData) {
                var countBy = underscore.countBy(orderByData[ky], function(item) {
                    return item.type;
                });
                linechart[ky] = countBy;
            }

            results.linechart = {
                'users': [],
                'tags': [],
                'groups': [],
                'date': []
            };

            for (var ky in linechart) {
                results.linechart.users.push(underscore.isNumber(linechart[ky]['user']) ? linechart[ky]['user'] : 0);
                results.linechart.tags.push(underscore.isNumber(linechart[ky]['tag']) ? linechart[ky]['tag'] : 0);
                results.linechart.groups.push(underscore.isNumber(linechart[ky]['group']) ? linechart[ky]['group'] : 0);
                results.linechart.date.push(moment(ky).format("MM/DD"));
            }
            if (err) {
                res.json({
                    "code": 401,
                    "data": null,
                    "message": "Unable to fetch data"
                });
            } else {
                res.json({
                    "code": 200,
                    "data": results,
                    "message": "Graph Data fetched successfully!"
                });
            }
        });
}