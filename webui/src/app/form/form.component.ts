import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormControl } from '@angular/forms';

@Component({
    selector: 'app-form',
    template: `
  <ul *ngIf="shouldShowErrors()">
    <li class="r-c" *ngFor="let error of listOfErrors()">{{error}}</li>
  </ul>
`,
    styles: [`ul{padding: 5px 0 0 0;margin:0;}li{list-style:none;color:red;}`]
})
export class FormComponent {

    private static readonly warnMessages = {
        'required': () => 'This field is required',
        'email': (params) => params.message,
        'password': (params) => params.message,
        'passwordMissmatch': () => 'password does not match'

    };

    @Input()
    private control: AbstractControlDirective | AbstractControl;

    shouldShowErrors(): boolean {
        return this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field]));
    }


    private getMessage(type: string, params: any) {
        return FormComponent.warnMessages[type](params);
    }



}
