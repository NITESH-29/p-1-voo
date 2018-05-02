import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../services/form.valid.service';
import { routerTransition } from '../router.animations';
import {ForgetService}from './forget.service';
import {Router}from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
   animations: [routerTransition()]
})

export class ForgotPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  Formdata: any = [];
  constructor(
    private formValidations: FormValidationsService,
    private forgetService:ForgetService,
    private router:Router,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        this.formValidations.emailValidator
      ]))
    })
  }
  forgetPassword() {
    this.forgetService.forgetPassword(this.passwordForm.value)
    .subscribe((res: any) => {
      res = res.data ? res.data : res;    
      if(res.code==200){
        this.toaster.success(res.message);
        this.router.navigate(['/login'])
      } else {
        this.toaster.error(res.message);
      }
    })
  }
}


