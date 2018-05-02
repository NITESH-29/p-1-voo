import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user.component';
import { UserListComponent } from './userlist.component';

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children:[
            {
                path: '',
                component: UserListComponent
            },
            {
                path: 'details/:id',
                component: UserDetailsComponent
            }
        ]
        
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
