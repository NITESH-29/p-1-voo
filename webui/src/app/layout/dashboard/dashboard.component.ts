import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {dashboardService } from './dashboard.service'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public users: Array<any> = [];
    public userActivity: Array<any> = [];
    public userCount : number=0;
    public tagCount : number=0;
    public groupCount : number=0;
    public activityCount : number=0;
    constructor(
        private dashboards:dashboardService
    ) {
                
    }

    ngOnInit() {
        this.dashboards.getDashboardCount().subscribe((res)=>{
            res = res.data ? res.data : res;        
            if(res.code == 200 && res.data != null){
            this.userCount = res.data.usersData;
            this.tagCount = res.data.tagsData;
            this.groupCount = res.data.groupsData;
            this.activityCount = res.data.activitiesData;            
            }else{
            }
        })
        this.dashboards.getRecentUsers().subscribe((res)=>{
            res = res.data ? res.data : res;   
            if(res.code == 200 && res.data !=null){
                res.data.forEach(element => {
                this.users.push(element)    
            });            
            }else{
            }
        })
        this.dashboards.getRecentActivity().subscribe((res)=>{
            res = res.data ? res.data : res;   
            if(res.code == 200){
                res.data.forEach(element => {
                this.userActivity.push(element)    
            });
            }
            // let rs =res.json();
            // console.log(rs);
        })
    }    
}
