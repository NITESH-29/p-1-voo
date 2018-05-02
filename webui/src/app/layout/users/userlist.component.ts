import { any } from 'codelyzer/util/function';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, RouterModule, Routes } from '@angular/router';
import { UsersService } from './users.services';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api'
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI, BlockUIService } from 'ng-block-ui';

@Component({
    selector: 'user-list',
    // templateUrl: './tables.component.html',
    templateUrl: `./view/userlist.component.html`,
    styleUrls: ['./view/userlist.component.scss'],
    animations: [routerTransition()]
})
export class UserListComponent implements OnInit {
    constructor(

        private Users: UsersService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private toastr: ToastrService,
        private BlockUIService: BlockUIService
    ) {
        for (let i = 1; i <= 100; i++) {
            this.collection.push(`item ${i}`);

        }
    }
    @BlockUI() blockUI: NgBlockUI;
    public UserTemp: any = [];
    public Count: any
    public searchText: any = ''
    public data: any = [];
    public collection: any = [];
    // public selectAll: any = [];

    public params: any = {
        'page': 1,
        'limit': 3,
        'sort': 'created',
        'order': 'desc',
        'firstName': '',
        'lastName': '',
        'email': ''
    };

    public sort(field: string, order: any): void {

        this.params.sort = field;
        this.params.order = order;
        this.getAll();
    }
    // public select
    public pageChanged(data: any): void {
        this.params.page = data;
        this.getAll();
    }

    public search(data: any): void {
        this.params.firstName = data;
        this.params.lastName = data;
        this.params.email = data
        this.getAll()
    }




    public getAll() {
        this.blockUI.start('Loading...'); // Start blocking
        this.Users.getUserData(this.params).subscribe((result) => {
            if (result.code == 200) {
                this.data = result.data;
                this.Count = result.count;
                // this.toastr.success('Records has been fetched')
                setTimeout(() => {
                    this.blockUI.stop(); // Stop blocking
                }, 2000);
            } else {
                this.data = [];
                this.toastr.error('Sorry!No Record Found')
                setTimeout(() => {
                    this.blockUI.stop(); // Stop blocking
                }, 2000);
            }
            // this.Count.clear();
        })

    }
    public confirm(userID: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you delete this user?',
            accept: () => {
                //Actual logic to perform a confirmation
                this.Users.delete(userID).subscribe((result) => {
                    if (result.code == 200) {
                        this.toastr.success('User has been succesfully deleted.', 'Hey');
                        this.getAll();
                    }
                })

            },
            reject: () => {
                this.toastr.info('You cancelled deletion.', 'Oops');

            }
        });
    }

    public setStatus(userID: any, status: any, index: any) {
        console.log(userID, status, index, "Here are the values");
        let temp = status == true ? 'De-Activate' : 'Activate';
        this.confirmationService.confirm({
            message: 'Are you sure You want to ' + temp + ' this user?',
            accept: () => {
                //Actual logic to perform a confirmation
                this.Users.setUserStatus(userID, status).subscribe((result) => {
                    if (result.code == 200) {
                        this.toastr.success('Status has been successfully updated.', 'Hey');
                        this.data[index].is_active = !status;
                    }
                })

            },
            reject: () => {
                this.toastr.info('You cancelled deletion.', 'Oops');

            }
        });
    }

    public export2csv() {
        this.Users.getUserData({}).subscribe((result) => {
            // this.data.push(result.data.data)
            var options = {
                fieldSeparator: ',',
                showLabels: true,
                showTitle: false,
                useBom: true,
                headers: ["Firstname", "Lastname", "Email", "Password", "Mobile_no", "Gender", "Profile_pic", "User_type", "Company_name", "Address", "City", "State", "country", "Zipcode", "Barcode", "ResetPasswordToken", "ResetPasswordExpires\b", "Is_verified", "is_active", "is_deleted", "created", "modified", "startdates\n"]
            };
            this.data = result.data || [];
            var abcd = new Angular2Csv(this.data, 'Users Detail Sheet', options);
            this.data = []
        })
    }
    public navigates(abcd: any) {
        console.log(abcd, "Here is the value")
        this.router.navigate(['users/details/' + abcd])
    }


    ngOnInit() {
        this.blockUI.start('Loading...'); // Start blocking
        this.getAll();
    }

    selectAll(event: any) {
        let tempor = {
            "id": "",
            "email": "",
            "field": "",
            "status": true
        }
        this.UserTemp = [];
        for (let i = 0; i < this.data.length; i++) {
            this.data[i].checked = !this.data[i].checked;
            if (event.target.checked == true) {
                tempor.id = this.data[i].id;
                tempor.email = this.data[i].email;
                tempor.field = '';
                tempor.status = true;
                this.UserTemp.push(tempor);
            } else {
                this.UserTemp.splice(this.data[i], 1);
            }
        }
        console.log(this.UserTemp, "hgahsdghasgdhgasdhg")
    }
    selectOne(index: any) {
        let tempor = {
            "id": "",
            "email": "",
            "field": "",
            "status": true
        }
        if (this.data[index].checked == true) {
            tempor.id = this.data[index].id;
            tempor.email = this.data[index].email;
            tempor.field = '';
            tempor.status = true;
            this.UserTemp.push(tempor);
        } else {
            this.UserTemp.splice(index, 1);
        }
        console.log(this.UserTemp, "Here is the temporary array")
    }

    deleteAll(field) {
        if (this.UserTemp.length > 0) {
            this.UserTemp.forEach(element => {
                element.field = field;
            });
            this.UserTemp[0];
            this.Users.deleteBulk(this.UserTemp).subscribe((result) => {
                if (result.code == 200) {
                    this.toastr.success('Users deleted successfully')
                } else {
                    this.toastr.error(result.message);
                }
            });
        }
    }

    // select(index) {
    //     this.data[index].checked = !this.data[index].checked;
    // }

    takeAction(value) {
        console.log(value, typeof value);
        if (value == '1') {
            console.log("Case 1")
            this.deleteAll('isDeleted')
        } else if (value == '2') {
            console.log("Case 1")
            this.deleteAll('isActive')
        } else {
            (value == '3')
            console.log("Case 1")
            this.deleteAll('isInActive')
        }
    }

}