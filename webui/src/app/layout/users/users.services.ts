// import * as console from 'console';
import { any } from 'codelyzer/util/function';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from "../../core/config/app.config";

@Injectable()
export class UsersService {
    redirectUrl: string;
    isLoggedIn = false;
    constructor(
        private http: HttpClient,
        private config: AppConfig,
    ) { }



    getUserData(params: any): Observable<any> {
        return this.http.post(this.config.apiUrl + 'getAdminUsersList', params)
    }
    getUserById(data: any): Observable<any> {
        return this.http.get(this.config.apiUrl + 'getAdminUserView?' + data)
    }
    delete(data: any): Observable<any> {
        return this.http.post(this.config.apiUrl + 'changeUserStatus', { id: data })
    }
    deleteBulk(data: any): Observable<any> {
        return this.http.post(this.config.apiUrl + 'bulkUpdate', data)
    }
    setUserStatus(data: any, status: any): Observable<any> {
        return this.http.post(this.config.apiUrl + 'changeUserStatus', { id: data, status: status })
    }
};