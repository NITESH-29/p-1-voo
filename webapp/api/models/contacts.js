/* @schema   : Contact 
 * @created  : 26022018
 * @modified : 26022018
 * @purpose  : It contains all the contacts
 */
module.exports = function(vogels, Joi, DBMode) {
    return vogels.define(DBMode + 'Contact', {
        hashKey: 'userId',
        rangeKey: 'id',
        timestamps: true,
        schema: Joi.object().keys({
            id: Joi.string().trim().required(),
            contactId: Joi.string().trim(),
            fullName: Joi.string().trim().required(),
            familyName: Joi.string().trim(),
            profilePic: Joi.string().trim(),
            jobTitle: Joi.string().trim(),
            company: Joi.string().trim(),
            phoneNumbers: Joi.array().items({
                type: Joi.string().trim().required(),
                number: Joi.string().trim().required(),
            }),
            emails: Joi.array().items({
                type: Joi.string().trim().required(),
                email: Joi.string().trim().required(),
            }),
            userId: Joi.string().trim().required(),
            modifiedAt: Joi.date().default(new Date()),
            isActive: Joi.boolean().default(false),
            isDeleted: Joi.boolean().default(false),
        }).unknown()
    })
};