/* @schema   : Tag 
 * @created  : 26022018
 * @modified : 26022018
 * @purpose  : It contains all the tags associated with contacts
 */
module.exports = function(vogels, Joi, DBMode) {
    return vogels.define(DBMode + 'Tag', {
        hashKey: 'id',
        rangeKey: 'name',
        timestamps: true,
        schema: Joi.object().keys({
            id: Joi.string().trim().required(),
            name: Joi.string().trim().required(),
            contacts: Joi.array().items({
                conatctId: Joi.string().trim().required(),
                contactName: Joi.string().trim().required(),
            }),
            modifiedAt: Joi.date().default(new Date()),
            isActive: Joi.boolean().default(true),
            isDeleted: Joi.boolean().default(false),
        }).unknown()
    })
};