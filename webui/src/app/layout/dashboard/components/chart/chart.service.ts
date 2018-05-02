import { observable } from 'rxjs/symbol/observable';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from "../../../../core/config/app.config";

@Injectable()
export class ChartService {
    redirectUrl: string;
    isLoggedIn = false;
    constructor(
        private http: HttpClient,
        private config: AppConfig,
    ) { }

    getChartCount(): Observable<any> {
        // console.log(this.config.)
        return this.http.get(this.config.apiUrl + 'getAdminDashboardGraphCount')
    }
}