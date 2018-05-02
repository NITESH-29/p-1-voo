'use strict';

const config = {

    live: {
        mode: 'live',
        port: 3000,
        db: {
            user: '',
            password: '',
            url: 'https://dynamodb.us-west-1.amazonaws.com'
        },
        baseUrl: 'www.voozoo.com/', // Live path
        smtp: {
            service: 'Gmail',
            username: '',
            password: '',
            host: '',
            fromName: '',
            verificationMail: ''
        },
        awsses: {
            accessKeyId: 'AKIAJRUTDLJZKPDOTS4A',
            secretAccessKey: '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',
            region: 'us-west-2',
            fromName: 'admin@voozuu.com', //plz do not amend
        },
        cryptoAlgorithm: '',
        cryptoPassword: '',
        secret: '',
        googleApiKey: '',
        ARApiKey: '',
        apn: {
            certPath: '',
            keyPath: '.',
            passphrase: '',
            gateway: '',
            port: 2195
        },
        fcm: {
            ios_serverKey: '',
            android_serverKey: '',
            collapseKey: ''
        }
    },
    staging: {
        mode: 'staging',
        port: 5110,
        db: {
            user: '',
            password: '',
            url: 'https://dynamodb.us-west-1.amazonaws.com'
        },
        baseUrl: 'http://52.34.207.5:5110/', // Live Dev path
        smtp: {
            service: 'Gmail',
            username: 'collectivechild001@gmail.com',
            password: 'Collectivetest1!',
            host: 'smtp.gmail.com',
            fromName: 'admin@voozuu.com',
            verificationMail: ''
        },
        awsses: {
            accessKeyId: 'AKIAJRUTDLJZKPDOTS4A',
            secretAccessKey: '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',
            region: 'us-west-2',
            fromName: 'admin@voozuu.com', //plz do not amend
        },
        cryptoAlgorithm: '',
        cryptoPassword: '',
        secret: '@VooZuuLLC',
        googleApiKey: '',
        ARApiKey: '',
        apn: {
            certPath: '',
            keyPath: '',
            passphrase: '',
            gateway: '',
            port: 2195
        },
        fcm: {
            ios_serverKey: '',
            android_serverKey: '',
            collapseKey: ''
        }
    },
    local: {
        mode: 'local',
        port: 10010,
        db: {
            user: '',
            password: '',
            url: 'mongodb://localhost/voozoo'
        },
        baseUrl: 'http://localhost:10010/', // Live Dev path
        smtp: {
            service: 'Gmail',
            username: 'collectivechild001@gmail.com',
            password: 'Collectivetest1!',
            host: 'smtp.gmail.com',
            fromName: 'admin@voozuu.com',
            verificationMail: ''
        },
        awsses: {
            accessKeyId: '',
            secretAccessKey: '',
            region: '',
            fromName: '', //plz do not amend

        },
        cryptoAlgorithm: '',
        cryptoPassword: '',
        secret: '@VooZuuLLC',
        googleApiKey: '',
        ARApiKey: '',
        apn: {
            certPath: '',
            keyPath: '',
            passphrase: '',
            gateway: '',
            port: 2195
        },
        fcm: {
            ios_serverKey: '',
            android_serverKey: '',
            collapseKey: ''
        }
    }
};

module.exports.get = function get(env) {
    return config[env] || config.default;
}