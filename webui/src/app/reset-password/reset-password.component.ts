import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../services/form.valid.service';
import { routerTransition } from '../router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetService } from './resetpassword.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [routerTransition()]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetForm: FormGroup;
  Formdata: any = [];
  subscriber;
  resetKey; 

  constructor(
    private formValidations: FormValidationsService,
    private resetService: ResetService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) { 
    this.route.params      
      .subscribe(params => {   
        this.resetKey = params.resetKey
      });
  }

  ngOnInit() {
    this.resetForm = new FormGroup({
      'password': new FormControl('', Validators.compose([
        Validators.required,
        this.formValidations.passwordValidator
      ])),
      'confirmpassword': new FormControl('', Validators.compose([
        Validators.required,
        this.formValidations.passwordValidator
      ]))

    })
    this.subscriber = this.resetForm.valueChanges.subscribe(val => {
      let password = this.resetForm['controls'].password.value;
      let confirmpassword = this.resetForm['controls'].confirmpassword.value;
      if (password && confirmpassword && confirmpassword != password)
        this.resetForm.controls.confirmpassword.setErrors({ 'passwordMissmatch': true });
      else
        this.resetForm.controls.confirmpassword.setErrors(null);
    })
  }
  reset() {    
       this.resetService.reset({resetKey: this.resetKey, password: this.resetForm['controls'].password.value})
      .subscribe((res: any) => {
      res = res.data ? res.data : res;
       if(res.code==200){
        this.toaster.success(res.message)    
         this.router.navigate(['/login'])   
       } else {
        this.toaster.success(res.message)   
       }        
      
     })
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
