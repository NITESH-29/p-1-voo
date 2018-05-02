'use strict';

var dbObj = require('./../../db.js');
var validate = require('./../../config/validate.js');
var contactModal = dbObj.ContactModal();
var uuid = require('uuid');
var _ = require('underscore');
var async = require('async');
var fs = require('fs');

const config = require('../../config/config.js').get(process.env.NODE_ENV);

module.exports = {
    saveContact: saveContact,
    getContacts: getContacts,
};
/**
 * [saveContact - save contact information]
 * @param  {object}
 * @param  {object}
 * @return {object}
 */
function saveContact(req, res) {
    if (req.body && validate.isValid(req.body)) {
        async.eachSeries(req.body, function(value, callback) {
            var contactId = uuid.v4();
            value.id = contactId;
            if (value.profilePic) {
                var uploadPath = "public/uploads/user/" + new Date().getTime() + contactId + ".png";
                var data = value.profilePic.replace(/^data:image\/\w+;base64,/, "");
                var buf = new Buffer(data, 'base64');
                fs.writeFile(uploadPath, buf, function(err) {
                    if (err) {
                        console.log("err", err);
                    } else {
                        value.profilePic = config.baseUrl + uploadPath;
                        var contact = new contactModal(value);
                        contact.save(function(err, contact) {
                            if (err) {
                                callback(err, null)
                            } else {
                                callback()
                            }
                        })
                    }
                });
            }
        }, function(err) {
            if (err) {
                console.log("err", err)
                res.json({
                    "code": 401,
                    "data": null,
                    "message": "unable to save the data"
                });
            } else {
                res.json({
                    "code": 200,
                    "data": null,
                    "message": "Contact added successfully"
                });
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
/**
 * [getContact - get all the contacts information based on user_id]
 * @param  {object} 
 * @param  {object} 
 * @return {object} 
 */
function getContacts(req, res) {
    contactModal
        .query(req.swagger.params.userId.value)
        .exec(function(err, contactData) {
            if (err) {
                res.json({
                    "code": 401,
                    "data": null,
                    "message": "unable to fetch the data"
                });
            } else {
                res.json({
                    "code": 200,
                    "data": JSON.parse(JSON.stringify(contactData.Items)),
                    "message": "Contact fetched successfully"
                });
            }

        })
}