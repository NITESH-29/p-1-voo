import { any } from 'codelyzer/util/function';
import { Component, OnInit } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { routerTransition } from '../../router.animations';
import { Router, RouterModule, Routes } from '@angular/router';
import { UsersService } from './users.services';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';


@Component({
    selector: 'app-users',
    template:`<router-outlet></router-outlet>`,
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})
export class UsersComponent implements OnInit {
    constructor(){}
    ngOnInit(){}
}
    
