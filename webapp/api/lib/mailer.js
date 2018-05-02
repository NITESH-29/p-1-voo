var jwt = require('jsonwebtoken');
var async = require("async");
var nodemailer = require('nodemailer');
var ejs = require('ejs');
var path = require('path');

const config = require('../../config/config.js').get(process.env.NODE_ENV);

module.exports = {
    sendMail: sendMail,
};

var awsSesMail = require('aws-ses-mail');
var sesMail = new awsSesMail();
var sesConfig = {
    accessKeyId: config.awsses.accessKeyId,
    secretAccessKey: config.awsses.secretAccessKey,
    region: config.awsses.region
};
sesMail.setConfig(sesConfig);

var transporter = nodemailer.createTransport({
    host: config.smtp.host,
    service: config.smtp.service,
    port: 465,
    secure: true,
    auth: {
        user: config.smtp.username,
        pass: config.smtp.password
    },
    tls: {
        rejectUnauthorized: false
    }
});



function sendMail(to, subject, mailContent, userData, callbackMail) {
    replacePlaceholders(userData, mailContent, subject, function(mailContent, subject) {
        var options = {
            mailbody: mailContent
        }
        generateTemplate(options, function(mailContent) {
            if (config.mode == 'live' || config.mode == 'staging') {
                var mailOptions = {
                    from: config.awsses.fromName, // sender address
                    to: to, // list of receivers
                    subject: subject, // Subject line
                    content: mailContent // Mail content body 
                };
                console.log('mailOptions aws:- ', mailOptions);
                sesMail.sendEmail(mailOptions, function(err, data) {
                    if (err) {
                        console.log("errrrrrrrrrrrrrrr", err)
                        callbackMail(null, {
                            message: 'Mail failed'
                        });
                    } else {
                        console.log('Email(' + keyword + ') send to:- ', to);
                        callbackMail(null, {
                            message: 'Mail sent successfully'
                        });
                    }
                });
            } else {
                var mailOptions = {
                    from: config.smtp.fromName, // sender address
                    to: to, // list of receivers
                    subject: subject, // Subject line
                    html: mailContent // Mail content body 
                };
                // console.log(" mailContent:-", mailContent)
                // console.log('mailOptions smtp:- ', mailOptions);
                transporter.sendMail(mailOptions, function(error, info) { // send mail with defined transport object                    
                    if (error) {
                        callbackMail(null, {
                            message: 'Mail failed'
                        });
                    } else {
                        callbackMail(null, {
                            message: 'Mail sent successfully'
                        });
                    }
                });
            }
        });
    })
}




/* @function : generateTemplate
 * @created  : 20032018
 * @modified :
 * @purpose  : Create layout for emails header and footer
 */
var generateTemplate = function(options, callbackg) {
    var recepient = options.recepient || '',
        mailbody = options.mailbody;

    var fileName = path.resolve('./api/lib/mailTemplate.html');
    ejs.renderFile(fileName, {
        recepient: recepient,
        mailbody: mailbody
    }, {}, function(err, str) {
        if (err) {
            callbackg(mailbody);
        } else {
            callbackg(str || mailbody);
        }
    });
}


var replacePlaceholders = function(data, mailbody, subj, callbackr) {
    var content = mailbody.replace(/BASEURL|Firstname|Lastname|Email|verifyLink/gi, function(match, token) {
        switch (match) {
            case 'BASEURL':
                return config.baseUrl;
                break;
            case 'Firstname':
                return data.firstName;
                break;
            case 'Lastname':
                return data.lastName;
                break;
            // case 'Password':
            //     return data.password;
            //     break;
            case 'Email':
                return data.email;
                break;
            case 'verifyLink':
                return "<a href='" + data.link + "' target='_blank'>'" + data.link + "'</a>";
                break;
        }
    })
    var subject = subj.replace(/\[\[(.*?)\]\]/g, function(match1, token1) {
        switch (token1) {
            case 'ReceiverFname':
                return data.firstName;
                break;
            case 'ReceiverLname':
                return data.lastName
                break;
        }
    })
    if (content && subject) {
        callbackr(content, subject);
    }
}




function capitalize(str) {
    return str.toLowerCase().replace(/\b\w/g, function(m) {
        return m.toUpperCase();
    });
}