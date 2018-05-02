import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '../../../login/loginservice';
//import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    admin_Name: any;
    constructor(public router: Router,
        private loginService: LoginService,
        private toaster: ToastrService

    ) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.admin_Name = localStorage.getItem('name');
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    // rltAndLtr() {
    //     const dom: any = document.querySelector('body');
    //     dom.classList.toggle('rtl');
    // }
    onLoggedout(a) {
        this.loginService.logout(a)
            .subscribe((res: any) => {
                console.log(res)
                if (res.data.messageId == 200) {
                    this.toaster.success(res.data.message)
                    localStorage.removeItem('name');
                    localStorage.removeItem('token');
                    localStorage.removeItem('isLoggedin');
                    // alert(res.data.message)
                }
                else
                    alert(res.data.message)
            })
    }

    // changeLang(language: string) {
    //     this.translate.use(language);
    // }
}
