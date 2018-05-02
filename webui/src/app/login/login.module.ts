import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormComponent } from '../form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationsService } from '../services/form.valid.service';
import { LoginService } from './loginservice';
import { Utills } from '../core/utility/utills';
import { AppConfig } from '../core/config/app.config';

import { SharedModuleModule } from '../shared/modules/shared-module.module';



@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModuleModule
  ],
  declarations: [
    LoginComponent,

  ],
  providers: [FormValidationsService, LoginService, AppConfig]
})
export class LoginModule { }
