import { FormControl, } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormValidationsService {

    constructor() { }
    emailValidator(control: FormControl) {
        let email = control.value;
        let EMAIL_REGEXP = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        if (email && email != "" && (email.length <= 5 || !EMAIL_REGEXP.test(email))) {
            return { "email": { "message": "Please enter valid email address" } };
        }
        return null;
    }

    passwordValidator(control: FormControl) {
        let password = control.value;
        //let Password_Regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/;
        if (password && password != "" && (password.length <= 5 || password.length >= 20)) {
            return { "password": { "message": "Please enter valid password" } }
        }
    }

}
