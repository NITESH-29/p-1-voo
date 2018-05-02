/* @schema   : Group 
 * @created  : 26022018
 * @modified : 26022018
 * @purpose  : It contains groups information
 */
var uuid = require('uuid');
var groupId = uuid.v4();
module.exports = function(vogels, Joi, DBMode) {
    return vogels.define(DBMode + 'Group', {
        hashKey: 'id',
        rangeKey: 'userId',
        timestamps: true,
        schema: Joi.object().keys({
            id: Joi.string().trim().required().default(groupId),
            name: Joi.string().trim().required(),
            groupId: Joi.string().trim(),
            userId: Joi.string().trim(),
            contacts: Joi.array().items({
                conatctId: Joi.string().trim().required(),
                contactName: Joi.string().trim().required(),
            }),
            modifiedAt: Joi.date().default(new Date()),
            isActive: Joi.boolean().default(false),
            isDeleted: Joi.boolean().default(false),
        }).unknown()
    })
};