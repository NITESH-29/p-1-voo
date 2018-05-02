import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from "../core/config/app.config";

@Injectable()
export class LoginService {
    redirectUrl: string;
    isLoggedIn = false;
    constructor(
        private http: HttpClient,
        private config: AppConfig,
    ) { }



    login(data: any): Observable<any> {
        return this.http.post(this.config.apiUrl + 'adminLogin', data).map((res: any) => {
            let body = res;
            return { data: body }
        });
    }

    logout(data: any): Observable<any> {
        return this.http.post(this.config.apiUrl + 'adminLogout', data).map((res: any) => {
            let body = res;
            return { data: body }
            // this.storage.clear(this.config.token.keyID);
            // this.storage.clear(this.config.token.userKey);

            // this.isLoggedIn = false;
            // return Observable.of({ status: true });
        })
    }
}
