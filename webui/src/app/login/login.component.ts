import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { routerTransition } from '../router.animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationsService } from '../services/form.valid.service';
import { LoginService } from './loginservice';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    msg: String;
    registerForm: FormGroup;
    Formdata: any = [];
    constructor(public router: Router,
        private formValidations: FormValidationsService,
        private _cookieService: CookieService,
        private auth: LoginService,
        private toaster: ToastrService
    ) {
        if (_cookieService.get('remember')) {
            this.Formdata.email = this._cookieService.get('email');
            this.Formdata.password = this._cookieService.get('password');
            this.Formdata.rememberme = this._cookieService.get('remember');
        }
    }

    ngOnInit() {
        this.registerForm = new FormGroup({

            'email': new FormControl('', Validators.compose([
                Validators.required,
                this.formValidations.emailValidator,


            ])),
            'password': new FormControl('', Validators.compose([
                Validators.required,
                this.formValidations.passwordValidator
            ])),
            'rememberme': new FormControl(false)

        })

    }
    onSubmit() {
        this.auth
            .login(this.registerForm.value)
            .subscribe((res: any) => {
                // console.log(res.data)
                res = res.data ? res.data : res;
                if (res.code != 200) {
                    this.toaster.error(res.message);
                } if (res.code == 200) {
                    localStorage.setItem('isLoggedin', 'true');
                    this._cookieService.put('email', this.Formdata.email);
                    this._cookieService.put('password', this.Formdata.password);
                    this._cookieService.put('remember', this.Formdata.rememberme);
                    localStorage.setItem('name', res['data'].firstName + ' ' + res['data'].lastName);
                    localStorage.setItem('token', res['data'].token);

                    if (!this.Formdata.rememberme) {
                        this._cookieService.remove('email')
                        this._cookieService.remove('password')
                        this._cookieService.remove('remember')
                    }
                    this.router.navigate(['/dashboard'])

                }
            })
    }

}
