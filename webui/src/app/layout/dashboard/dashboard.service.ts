import { observable } from 'rxjs/symbol/observable';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from "../../core/config/app.config";

@Injectable()
export class dashboardService {
    redirectUrl: string;
    isLoggedIn = false;
    constructor(
        private http: HttpClient,
        private config: AppConfig,
    ) { }

    getDashboardCount(): Observable<any> {        
        return this.http.get(this.config.apiUrl + 'getAdminDashboardCount').map((res: any) => {
            let body = res;
            console.log(body,"Here is the body")
            return { data:res}
        });
    }

    getRecentUsers(): Observable<any> {
        // console.log(this.config.)
        return this.http.get(this.config.apiUrl + 'getAdminDashboardRecentUsers').map((res: any) => {
            let body = res;
            console.log(body,"Here is the body")
            return { data:res}
        });
    }

    getRecentActivity():Observable<any>{
        return this.http.get(this.config.apiUrl+'getAdminDashboardRecentActivities')
    }
}