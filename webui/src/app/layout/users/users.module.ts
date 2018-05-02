import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { PageHeaderModule } from './../../shared';
import { UsersService } from './users.services';
import { UserDetailsComponent } from './user.component';
import { UserListComponent } from './userlist.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule, BlockUIService } from 'ng-block-ui';


// import { ToastrModule } from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        PageHeaderModule,
        NgxPaginationModule,
        ConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule,
        BlockUIModule.forRoot()
    ],
    declarations: [
        UsersComponent,
        UserDetailsComponent,
        UserListComponent],
    providers: [UsersService, ConfirmationService, BlockUIService]
})
export class UsersModule { }
