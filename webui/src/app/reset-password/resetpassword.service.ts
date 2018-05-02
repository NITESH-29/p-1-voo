import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from "../core/config/app.config";

@Injectable()
export class ResetService {
    redirectUrl: string;
    isLoggedIn = false;
    constructor(
        private http: HttpClient,
        private config: AppConfig,
    ) { }
    // FORM GROUP VALIDATORS
    //  function matchingPasswords(passwordKey: string, cpasswordKey: string) {
    //   return (group: FormGroup): { [key: string]: any } => {

    //     let password = group.controls[passwordKey];
    //     let cpassword = group.controls[cpasswordKey];

    //     if (password.value !== cpassword.value) {
    //       return {
    //         mismatchedPasswords: true
    //       };
    //     }
    //   }
    // }
    reset(data: any): Observable<any> {
        return this.http.post(this.config.apiUrl + 'adminResetPassword', data).map((res: any) => {
            let body = res;
            return { data: body }
        });
    }
}
