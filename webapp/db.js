var vogels = require('vogels');
var Joi = require('joi');
var AWS = require('aws-sdk');
var DBMode = "VooZuu_";
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var AWS_CONFIG = require('./config/resources.js');
// Configuration of DynamoDB
vogels.AWS.config.update({
    accessKeyId: AWS_CONFIG.AWS.ACCESS_KEY_ID,
    secretAccessKey: AWS_CONFIG.AWS.SECRET_ACCESS_KEY,
    region: AWS_CONFIG.AWS.REGION,
    endpoint: AWS_CONFIG.AWS.ENDPOINT
});
var TagSchema = require('./api/models/tags.js')(vogels, Joi, DBMode);
var UserSchema = require('./api/models/users.js')(vogels, Joi, DBMode);
var ContactSchema = require('./api/models/contacts.js')(vogels, Joi, DBMode);
var GroupSchema = require('./api/models/groups.js')(vogels, Joi, DBMode);
var MessageSchema = require('./api/models/messages.js')(vogels, Joi, DBMode);

var createTables = {};
createTables[DBMode + 'Tag'] = {
    readCapacity: 5,
    writeCapacity: 3
};
createTables[DBMode + 'User'] = {
    readCapacity: 5,
    writeCapacity: 3
};
createTables[DBMode + 'Contact'] = {
    readCapacity: 5,
    writeCapacity: 3
};
createTables[DBMode + 'Group'] = {
    readCapacity: 5,
    writeCapacity: 3
};
createTables[DBMode + 'Message'] = {
    readCapacity: 5,
    writeCapacity: 3
};
vogels.createTables(createTables, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("Tables Created!");
    }
});
module.exports = {
    generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword: function(password, comprPassword) {
        return bcrypt.compareSync(password, comprPassword);
    },
    vogels: function() {
        return vogels;
    },
    encryptText: function(text) {
        var cipher = crypto.createCipher('aes-256-ctr', 'VooZuu@2018'); //(algorithm,password)
        var crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    decryptText: function(text, callback) {
        var decipher = crypto.createDecipher('aes-256-ctr', 'VooZuu@2018');
        var dec = decipher.update(text, 'hex', 'utf8'); //update(Buffer(text, 'hex','utf8'));
        dec += decipher.final('utf8');
        return callback(null, dec);
    },
    TagModal: function() {
        return TagSchema;
    },
    UserModal: function() {
        return UserSchema;
    },
    ContactModal: function() {
        return ContactSchema;
    },
    GroupModal: function() {
        return GroupSchema;
    },
    MessageModal: function() {
        return MessageSchema;
    }    
}