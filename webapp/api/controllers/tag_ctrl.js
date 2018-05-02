'use strict';
var util = require('util');
var dbObj = require('./../../db.js');
var TagModal = dbObj.TagModal();
var uuid = require('uuid');
var tagId = uuid.v4();
module.exports = {
    saveTag: saveTag,
    getTag: getTag,
    updateTag: updateTag
};
/**
 * [saveTag - save tag related information associated to particular contact]
 * @param  {object}
 * @param  {object}
 * @return {object}
 */
function saveTag(req, res) {
    req.body.id = tagId;
    var tag = new TagModal(req.body);
    tag.save(function(err, tag) {
        if (err) {
            console.log("errrrrrrrrr", err)
            res.json({
                "code": 401,
                "data": null,
                "message": "Error saving tag data"
            });
        } else {
            res.json({
                "code": 200,
                "data": tag,
                "message": "Tag saved successfully"
            });
        }
    })
}
/**
 * [getTag- get tag information associated to particular contact]
 * @param  {object}
 * @param  {object}
 * @return {object}
 */
function getTag(req, res) {
    TagModal
        .query(contact_id)
        .exec(function(err, tag) {
            if (err) {
                res.json({
                    "code": 401,
                    "data": null,
                    "message": "Error fetching tag data"
                });
            } else {
                res.json({
                    "code": 200,
                    "data": tag,
                    "message": "Tag fetched successfully"
                });
            }
        })
}
/**
 * [updateTag- update status and the information of particular tag]
 * @param  {object}
 * @param  {object}
 * @return {object}
 */
function updateTag(req, res) {
    TagModal
        .update(req.swagger.params.contact_id.value, function(err, tagdata) {
            if (err) {
                res.json({
                    "code": 401,
                    "data": null,
                    "message": "Error updating task data"
                });
            } else {
                res.json({
                    "code": 200,
                    "data": tagdata,
                    "message": "task updated successfully"
                });
            }
        });
}