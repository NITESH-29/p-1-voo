import { any } from 'codelyzer/util/function';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UsersService } from './users.services';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';




@Component({
    selector: 'user-details',
    templateUrl: './view/user.component.html',
    styleUrls: ['./view/user.component.scss'],
    animations: [routerTransition()]
})
export class UserDetailsComponent implements OnInit {
    constructor(
        private Users: UsersService,
        private activatedRoute: ActivatedRoute
    ) {

    }
    public userData: any;



    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.Users.getUserById(params.id).subscribe((result) => {
                if (result.code == 200) {
                    this.userData = result.data;
                } else {
                }

            });
        });

    }
}
