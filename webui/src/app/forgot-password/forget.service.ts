import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from "../core/config/app.config";

@Injectable()
export class ForgetService {
    redirectUrl: string;
    isLoggedIn = false;
    constructor(
        private http: HttpClient,
        private config: AppConfig,
    ) { }

    forgetPassword(data: any): Observable<any> {
        return this.http.post(this.config.apiUrl + 'adminForgotPassword', data).map((res: any) => {
            let body = res;
            return { data: body }
        });
    }
}
