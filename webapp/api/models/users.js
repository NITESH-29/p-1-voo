/* @schema   : users
 * @created  : 26022018
 * @modified : 26022018
 * @purpose  : It contains users information
 */
module.exports = function(vogels, Joi, DBMode) {
    return vogels.define(DBMode + 'User', {
        hashKey: 'email',
        rangeKey: 'id',
        timestamps: true,
        schema: Joi.object().keys({
            id: Joi.string().required(),
            firstName: Joi.string().trim(),
            lastName: Joi.string().trim(),
            email: Joi.string().email(),
            password: Joi.string().trim(),
            type: Joi.string().required(), //super_admin, user
            profilePic: Joi.string().trim(),
            device: Joi.object().keys({
                joinDate: Joi.date().default(new Date()),
                deviceToken: Joi.string().trim(), // Device token value to get from app
                deviceType: Joi.string().trim(), // Device type like iOS 
                deviceId: Joi.string().trim(), // Device Id if there  
                token: Joi.string().trim(), // token for device login
                lastLoginDate: Joi.date(), // Last login date from mobile 
                lastLogoutDate: Joi.date(), // Last logout date from mobile 
            }),
            lastLoginDate: Joi.date(),
            phoneNumber: Joi.string(),
            verifyToken: Joi.string(),
            token: Joi.string(),
            resetPasswordToken: Joi.string(),
            resetPasswordExpires: Joi.date(),
            modifiedAt: Joi.date().default(new Date()),
            isActive: Joi.boolean().default(false),
            isDeleted: Joi.boolean().default(false),
        }).unknown()
    });
};