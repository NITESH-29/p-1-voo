import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormComponent } from '../form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationsService } from '../services/form.valid.service';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetRouting } from './reset.routing';
import { ResetService } from './resetpassword.service';
import { AppConfig } from '../core/config/app.config';
import { SharedModuleModule } from '../shared/modules/shared-module.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ResetRouting,
        SharedModuleModule
    ],
    declarations: [
        ResetPasswordComponent

    ],
    providers: [FormValidationsService, ResetService, AppConfig]
})
export class ResetModule { }
