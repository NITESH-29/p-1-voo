/* @schema   : Message 
 * @created  : 26022018
 * @modified : 26022018
 * @purpose  : It contains the messages information
 */
var uuid = require('uuid');
var messageId = uuid.v4();
module.exports = function(vogels, Joi, DBMode) {
    return vogels.define(DBMode + 'Message', {
        hashKey: 'id',
        rangeKey: 'userId',
        timestamps: true,
        schema: Joi.object().keys({
            id: Joi.string().trim().required().default(messageId),
            userId: Joi.string().trim().required(),
            type: Joi.boolean().required(), //1=> SMS, 2=>Email
            groupId: Joi.string(),
            groupName: Joi.string(),
            contactId: Joi.string(),
            contactName: Joi.string(),
            message: Joi.string(),
            sentDate: Joi.date().default(new Date()),
            modifiedAt: Joi.date().default(new Date()),
            isActive: Joi.boolean().default(false),
            isDeleted: Joi.boolean().default(false),
        }).unknown()
    })
};