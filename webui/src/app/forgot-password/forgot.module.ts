import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormComponent } from '../form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationsService } from '../services/form.valid.service';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotRouting } from './forgot.routing';
import { ForgetService } from './forget.service';
import { AppConfig } from '../core/config/app.config';
import { SharedModuleModule } from '../shared/modules/shared-module.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ForgotRouting,
        SharedModuleModule
    ],
    declarations: [
        ForgotPasswordComponent
    ],
    providers: [
        FormValidationsService,
        ForgetService,
        AppConfig
    ]
})
export class ForgotModule { }
