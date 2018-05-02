webpackJsonp(["login.module"],{

/***/ "./src/app/login/login-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_component__ = __webpack_require__("./src/app/login/login.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__login_component__["a" /* LoginComponent */]
    },
];
var LoginRoutingModule = /** @class */ (function () {
    function LoginRoutingModule() {
    }
    LoginRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], LoginRoutingModule);
    return LoginRoutingModule;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"login-page\" [@routerTransition]>\n    <div class=\"row justify-content-md-center\">\n        <div class=\"col-md-4\">\n            <img src=\"assets/images/logo.png\" width=\"150px\" class=\"user-avatar\" />\n            <h1>LogIn</h1>\n            <form [formGroup]=\"registerForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"form-content\">\n                    <div class=\"form-group\">\n                        <input type=\"email\" formControlName=\"email\" [(ngModel)]=\"Formdata.email\" class=\"form-control input-underline input-lg\" id=\"email\"\n                            placeholder=\"Email *\">\n                        <app-form [control]=\"registerForm.controls.email\"></app-form>\n\n                    </div>\n\n                    <div class=\"form-group\">\n                        <input type=\"password\" formControlName=\"password\" [(ngModel)]=\"Formdata.password\" class=\"form-control input-underline input-lg\"\n                            id=\"password\" placeholder=\"Password *\">\n                        <app-form [control]=\"registerForm.controls.password\"></app-form>\n                    </div>\n                    <div class=\"form-group checkbox icheck  text-left mb-0\">\n                        <label>\n                                <input type=\"checkbox\"  formControlName=\"rememberme\" [(ngModel)]=\"Formdata.rememberme\"> Remember Me\n                            </label>\n                        <a class=\"pull-right\" [routerLink]=\"['/forgotPassword']\"> I forgot my Password</a>\n                    </div>\n                </div>\n                <button class=\"btn rounded-btn\" type=\"submit\" [disabled]=\"!registerForm.valid\"> Log in </button>\n            </form>\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block; }\n\n.login-page {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: auto;\n  background: #222;\n  text-align: center;\n  color: #fff;\n  padding: 3em; }\n\n.login-page .col-lg-4 {\n    padding: 0; }\n\n.login-page .input-lg {\n    height: 46px;\n    padding: 10px 16px;\n    font-size: 18px;\n    line-height: 1.3333333;\n    border-radius: 0; }\n\n.login-page .input-underline {\n    background: 0 0;\n    border: none;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    border-bottom: 2px solid rgba(255, 255, 255, 0.5);\n    color: #fff;\n    border-radius: 0; }\n\n.login-page .input-underline:focus {\n    border-bottom: 2px solid #fff;\n    -webkit-box-shadow: none;\n            box-shadow: none; }\n\n.login-page .rounded-btn {\n    border-radius: 50px;\n    color: rgba(255, 255, 255, 0.8);\n    background: #222;\n    border: 2px solid rgba(255, 255, 255, 0.8);\n    font-size: 18px;\n    line-height: 40px;\n    padding: 0 25px; }\n\n.login-page .btn:disabled {\n    color: white;\n    border: 2px solid white;\n    outline: none;\n    cursor: not-allowed; }\n\n.login-page h1 {\n    font-weight: 300;\n    margin-top: 20px;\n    margin-bottom: 10px;\n    font-size: 36px; }\n\n.login-page h1 small {\n      color: rgba(255, 255, 255, 0.7); }\n\n.login-page .form-group {\n    padding: 8px 0; }\n\n.login-page .form-group input::-webkit-input-placeholder {\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-group input:-moz-placeholder {\n      /* Firefox 18- */\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-group input::-moz-placeholder {\n      /* Firefox 19+ */\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-group input:-ms-input-placeholder {\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-content {\n    padding: 40px 0; }\n\n.login-page .user-avatar {\n    border-radius: 50%;\n    border: 2px solid #fff; }\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__ = __webpack_require__("./node_modules/angular2-cookie/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_form_valid_service__ = __webpack_require__("./src/app/services/form.valid.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__loginservice__ = __webpack_require__("./src/app/login/loginservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_toastr__ = __webpack_require__("./node_modules/ngx-toastr/esm5/ngx-toastr.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, formValidations, _cookieService, auth, toaster) {
        this.router = router;
        this.formValidations = formValidations;
        this._cookieService = _cookieService;
        this.auth = auth;
        this.toaster = toaster;
        this.Formdata = [];
        if (_cookieService.get('remember')) {
            this.Formdata.email = this._cookieService.get('email');
            this.Formdata.password = this._cookieService.get('password');
            this.Formdata.rememberme = this._cookieService.get('remember');
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.registerForm = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormGroup */]({
            'email': new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* Validators */].required,
                this.formValidations.emailValidator,
            ])),
            'password': new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* Validators */].required,
                this.formValidations.passwordValidator
            ])),
            'rememberme': new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */](false)
        });
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.auth
            .login(this.registerForm.value)
            .subscribe(function (res) {
            // console.log(res.data)
            res = res.data ? res.data : res;
            if (res.code != 200) {
                _this.toaster.error(res.message);
            }
            if (res.code == 200) {
                localStorage.setItem('isLoggedin', 'true');
                _this._cookieService.put('email', _this.Formdata.email);
                _this._cookieService.put('password', _this.Formdata.password);
                _this._cookieService.put('remember', _this.Formdata.rememberme);
                localStorage.setItem('name', res['data'].firstName + ' ' + res['data'].lastName);
                localStorage.setItem('token', res['data'].token);
                if (!_this.Formdata.rememberme) {
                    _this._cookieService.remove('email');
                    _this._cookieService.remove('password');
                    _this._cookieService.remove('remember');
                }
                _this.router.navigate(['/dashboard']);
            }
        });
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__("./src/app/login/login.component.html"),
            styles: [__webpack_require__("./src/app/login/login.component.scss")],
            animations: [Object(__WEBPACK_IMPORTED_MODULE_3__router_animations__["a" /* routerTransition */])()]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_5__services_form_valid_service__["a" /* FormValidationsService */],
            __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_core__["CookieService"],
            __WEBPACK_IMPORTED_MODULE_6__loginservice__["a" /* LoginService */],
            __WEBPACK_IMPORTED_MODULE_7_ngx_toastr__["b" /* ToastrService */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/login.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_routing_module__ = __webpack_require__("./src/app/login/login-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_component__ = __webpack_require__("./src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_form_valid_service__ = __webpack_require__("./src/app/services/form.valid.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__loginservice__ = __webpack_require__("./src/app/login/loginservice.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_config_app_config__ = __webpack_require__("./src/app/core/config/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_modules_shared_module_module__ = __webpack_require__("./src/app/shared/modules/shared-module.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__login_routing_module__["a" /* LoginRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_8__shared_modules_shared_module_module__["a" /* SharedModuleModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__login_component__["a" /* LoginComponent */],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_5__services_form_valid_service__["a" /* FormValidationsService */], __WEBPACK_IMPORTED_MODULE_6__loginservice__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_7__core_config_app_config__["a" /* AppConfig */]]
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ })

});
//# sourceMappingURL=login.module.chunk.js.map