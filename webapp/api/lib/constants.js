const emailSubjects = {
    "signup": "Welcome to Voozuu - Verify your email address",
    "forgotPassword": "Voozuu - Forgot password",
    "resetPassword": "Voozuu - Reset password"
}

const emailTemplates = {
    "signup": "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><meta name=\"viewport\" content=\"width=device-width\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><title></title></head><body><table><tr><td align=\"center\"><img src=\"logo.jpg\"></td></tr><tr><td>Hello \"Firstname\",</td></tr><tr><td>Please click on below link to verify your account with VooZuu</td></tr><tr><td>\"verifyLink\"</td></tr><tr><td align=\"center\">Vogasoft Inc California, US</td></tr></table></body></html>",
    "forgotPassword": "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><meta name=\"viewport\" content=\"width=device-width\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><title></title></head><body><table><tr><td align=\"center\"><img src=\"logo.jpg\"></td></tr><tr><td>Hello Firstname,</td></tr><tr><td>Please click on below link to reset your password</td></tr><tr><td>\"verifyLink\"</td></tr><tr><td align=\"center\">Vogasoft Inc California, US</td></tr></table></body></html>",
    "resetPassword": "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><meta name=\"viewport\" content=\"width=device-width\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><title></title></head><body><table><tr><td align=\"center\"><img src=\"logo.jpg\"></td></tr><tr><td>Hello Firstname,</td></tr><tr><td>You have just reset your Voozuu password successfully.</td></tr><tr><td align=\"center\">Vogasoft Inc California, US</td></tr></table></body></html>",
}


var obj = {
    emailSubjects: emailSubjects,
    emailTemplates: emailTemplates
};
module.exports = obj;