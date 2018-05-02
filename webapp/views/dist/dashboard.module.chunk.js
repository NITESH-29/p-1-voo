webpackJsonp(["dashboard.module"],{

/***/ "./src/app/layout/dashboard/components/chart/chart.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div style=\"display: block;\">\n            <canvas baseChart width=\"720px\" height=\"500\" [datasets]=\"lineChartData\" [labels]=\"lineChartLabels\" [options]=\"lineChartOptions\" [colors]=\"lineChartColors\" [legend]=\"lineChartLegend\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\" (chartClick)=\"chartClicked($event)\"></canvas>\n        </div>\n    </div>\n    <!-- <div class=\"col-md-6\" style=\"margin-bottom: 10px\">\n        <table class=\"table table-responsive table-condensed\">\n            <tr>\n                <th *ngFor=\"let label of lineChartLabels\">{{label}}</th>\n            </tr>\n            <tr *ngFor=\"let d of lineChartData\">\n                <td *ngFor=\"let label of lineChartLabels; let j=index\">{{d && d.data[j]}}</td>\n            </tr>\n        </table>\n        <button (click)=\"randomize()\">CLICK</button>\n    </div> -->\n</div>"

/***/ }),

/***/ "./src/app/layout/dashboard/components/chart/chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LineChartDemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chart_service__ = __webpack_require__("./src/app/layout/dashboard/components/chart/chart.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LineChartDemoComponent = /** @class */ (function () {
    // lineChart data to be passed i.e number of activities that too userwise 65=Sanjeev,28=sanjeev etc.
    function LineChartDemoComponent(charts) {
        this.charts = charts;
        this.dateArray = [];
        this.userArray = [];
        this.tagArray = [];
        this.groupArray = [];
        this.lineChartData = [{ data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }];
        this.lineChartLabels = []; //Users 
        this.lineChartOptions = {
            responsive: true,
            scales: {
                xAxes: [{
                        stacked: true
                    }],
                yAxes: [{
                        stacked: true
                    }]
            },
            height: '500px',
            width: '720px'
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.3)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.4)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    LineChartDemoComponent.prototype.getCounts = function () {
        var _this = this;
        this.charts.getChartCount().subscribe(function (result) {
            if (result.code === 200) {
                _this.userArray = result.data.linechart.users;
                _this.tagArray = result.data.linechart.tags;
                _this.dateArray = result.data.linechart.date;
                _this.groupArray = result.data.linechart.groups;
                _this.lineChartData = [
                    { data: _this.userArray, label: 'Users' },
                    { data: _this.tagArray, label: 'Tags' },
                    { data: _this.groupArray, label: 'Groups' }
                ];
                _this.lineChartLabels = [];
                _this.dateArray.forEach(function (element) {
                    _this.lineChartLabels.push(element);
                });
            }
            else {
                console.log('No record found');
            }
        });
    };
    LineChartDemoComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    LineChartDemoComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    LineChartDemoComponent.prototype.ngOnInit = function () {
        this.getCounts();
    };
    LineChartDemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'line-chart-demo',
            template: __webpack_require__("./src/app/layout/dashboard/components/chart/chart.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__chart_service__["a" /* ChartService */]])
    ], LineChartDemoComponent);
    return LineChartDemoComponent;
}());



/***/ }),

/***/ "./src/app/layout/dashboard/components/chart/chart.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_config_app_config__ = __webpack_require__("./src/app/core/config/app.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChartService = /** @class */ (function () {
    function ChartService(http, config) {
        this.http = http;
        this.config = config;
        this.isLoggedIn = false;
    }
    ChartService.prototype.getChartCount = function () {
        // console.log(this.config.)
        return this.http.get(this.config.apiUrl + 'getAdminDashboardGraphCount');
    };
    ChartService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__core_config_app_config__["a" /* AppConfig */]])
    ], ChartService);
    return ChartService;
}());



/***/ }),

/***/ "./src/app/layout/dashboard/components/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timeline_timeline_component__ = __webpack_require__("./src/app/layout/dashboard/components/timeline/timeline.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__timeline_timeline_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification_notification_component__ = __webpack_require__("./src/app/layout/dashboard/components/notification/notification.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__notification_notification_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chart_chart_component__ = __webpack_require__("./src/app/layout/dashboard/components/chart/chart.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__chart_chart_component__["a"]; });





/***/ }),

/***/ "./src/app/layout/dashboard/components/notification/notification.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card-body\">\n    <div class=\"list-group\">\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-comment fa-fw\"></i> New Comment\n            <span class=\"float-right text-muted small\"><em>4 minutes ago</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-twitter fa-fw\"></i> 3 New Followers\n            <span class=\"float-right text-muted small\"><em>12 minutes ago</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-envelope fa-fw\"></i> Message Sent\n            <span class=\"float-right text-muted small\"><em>27 minutes ago</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-tasks fa-fw\"></i> New Task\n            <span class=\"float-right text-muted small\"><em>43 minutes ago</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-upload fa-fw\"></i> Server Rebooted\n            <span class=\"float-right text-muted small\"><em>11:32 AM</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-bolt fa-fw\"></i> Server Crashed!\n            <span class=\"float-right text-muted small\"><em>11:13 AM</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-warning fa-fw\"></i> Server Not Responding\n            <span class=\"float-right text-muted small\"><em>10:57 AM</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-shopping-cart fa-fw\"></i> New Order Placed\n            <span class=\"float-right text-muted small\"><em>9:49 AM</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-money fa-fw\"></i> Payment Received\n            <span class=\"float-right text-muted small\"><em>Yesterday</em></span>\n        </a>\n    </div>\n    <!-- /.list-group -->\n    <a href=\"#\" class=\"btn btn-default btn-block\">View All Alerts</a>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/dashboard/components/notification/notification.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/layout/dashboard/components/notification/notification.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotificationComponent = /** @class */ (function () {
    function NotificationComponent() {
    }
    NotificationComponent.prototype.ngOnInit = function () { };
    NotificationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-notification',
            template: __webpack_require__("./src/app/layout/dashboard/components/notification/notification.component.html"),
            styles: [__webpack_require__("./src/app/layout/dashboard/components/notification/notification.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], NotificationComponent);
    return NotificationComponent;
}());



/***/ }),

/***/ "./src/app/layout/dashboard/components/timeline/timeline.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card-body\">\n    <ul class=\"timeline\">\n        <li>\n            <div class=\"timeline-badge\"><i class=\"fa fa-check\"></i>\n            </div>\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                    <p><small class=\"text-muted\"><i class=\"fa fa-clock-o\"></i> 11 hours ago via Twitter</small>\n                    </p>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis.</p>\n                </div>\n            </div>\n        </li>\n        <li class=\"timeline-inverted\">\n            <div class=\"timeline-badge warning\"><i class=\"fa fa-credit-card\"></i>\n            </div>\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolorem quibusdam, tenetur commodi provident cumque magni voluptatem libero, quis rerum. Fugiat esse debitis optio, tempore. Animi officiis alias, officia repellendus.</p>\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium maiores odit qui est tempora eos, nostrum provident explicabo dignissimos debitis vel! Adipisci eius voluptates, ad aut recusandae minus eaque facere.</p>\n                </div>\n            </div>\n        </li>\n        <li>\n            <div class=\"timeline-badge danger\"><i class=\"fa fa-bomb\"></i>\n            </div>\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus numquam facilis enim eaque, tenetur nam id qui vel velit similique nihil iure molestias aliquam, voluptatem totam quaerat, magni commodi quisquam.</p>\n                </div>\n            </div>\n        </li>\n        <li class=\"timeline-inverted\">\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates est quaerat asperiores sapiente, eligendi, nihil. Itaque quos, alias sapiente rerum quas odit! Aperiam officiis quidem delectus libero, omnis ut debitis!</p>\n                </div>\n            </div>\n        </li>\n        <li>\n            <div class=\"timeline-badge info\"><i class=\"fa fa-save\"></i>\n            </div>\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis minus modi quam ipsum alias at est molestiae excepturi delectus nesciunt, quibusdam debitis amet, beatae consequuntur impedit nulla qui! Laborum, atque.</p>\n                    <hr>\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-primary btn-sm dropdown-toggle\" data-toggle=\"dropdown\">\n                            <i class=\"fa fa-gear\"></i>  <span class=\"caret\"></span>\n                        </button>\n                        <ul class=\"dropdown-menu\" role=\"menu\">\n                            <li><a href=\"#\">Action</a>\n                            </li>\n                            <li><a href=\"#\">Another action</a>\n                            </li>\n                            <li><a href=\"#\">Something else here</a>\n                            </li>\n                            <li class=\"divider\"></li>\n                            <li><a href=\"#\">Separated link</a>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </li>\n        <li>\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi fuga odio quibusdam. Iure expedita, incidunt unde quis nam! Quod, quisquam. Officia quam qui adipisci quas consequuntur nostrum sequi. Consequuntur, commodi.</p>\n                </div>\n            </div>\n        </li>\n        <li class=\"timeline-inverted\">\n            <div class=\"timeline-badge success\"><i class=\"fa fa-graduation-cap\"></i>\n            </div>\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt obcaecati, quaerat tempore officia voluptas debitis consectetur culpa amet, accusamus dolorum fugiat, animi dicta aperiam, enim incidunt quisquam maxime neque eaque.</p>\n                </div>\n            </div>\n        </li>\n    </ul>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/dashboard/components/timeline/timeline.component.scss":
/***/ (function(module, exports) {

module.exports = ".timeline {\n  position: relative;\n  padding: 20px 0 20px;\n  list-style: none; }\n\n.timeline:before {\n  content: \" \";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 50%;\n  width: 3px;\n  margin-left: -1.5px;\n  background-color: #eeeeee; }\n\n.timeline > li {\n  position: relative;\n  margin-bottom: 20px; }\n\n.timeline > li:before,\n.timeline > li:after {\n  content: \" \";\n  display: table; }\n\n.timeline > li:after {\n  clear: both; }\n\n.timeline > li:before,\n.timeline > li:after {\n  content: \" \";\n  display: table; }\n\n.timeline > li:after {\n  clear: both; }\n\n.timeline > li > .timeline-panel {\n  float: left;\n  position: relative;\n  width: 46%;\n  padding: 20px;\n  border: 1px solid #d4d4d4;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175); }\n\n.timeline > li > .timeline-panel:before {\n  content: \" \";\n  display: inline-block;\n  position: absolute;\n  top: 26px;\n  right: -15px;\n  border-top: 15px solid transparent;\n  border-right: 0 solid #ccc;\n  border-bottom: 15px solid transparent;\n  border-left: 15px solid #ccc; }\n\n.timeline > li > .timeline-panel:after {\n  content: \" \";\n  display: inline-block;\n  position: absolute;\n  top: 27px;\n  right: -14px;\n  border-top: 14px solid transparent;\n  border-right: 0 solid #fff;\n  border-bottom: 14px solid transparent;\n  border-left: 14px solid #fff; }\n\n.timeline > li > .timeline-badge {\n  z-index: 100;\n  position: absolute;\n  top: 16px;\n  left: 50%;\n  width: 50px;\n  height: 50px;\n  margin-left: -25px;\n  border-radius: 50% 50% 50% 50%;\n  text-align: center;\n  font-size: 1.4em;\n  line-height: 50px;\n  color: #fff;\n  background-color: #999999; }\n\n.timeline > li.timeline-inverted > .timeline-panel {\n  float: right; }\n\n.timeline > li.timeline-inverted > .timeline-panel:before {\n  right: auto;\n  left: -15px;\n  border-right-width: 15px;\n  border-left-width: 0; }\n\n.timeline > li.timeline-inverted > .timeline-panel:after {\n  right: auto;\n  left: -14px;\n  border-right-width: 14px;\n  border-left-width: 0; }\n\n.timeline-badge.primary {\n  background-color: #2e6da4 !important; }\n\n.timeline-badge.success {\n  background-color: #3f903f !important; }\n\n.timeline-badge.warning {\n  background-color: #f0ad4e !important; }\n\n.timeline-badge.danger {\n  background-color: #d9534f !important; }\n\n.timeline-badge.info {\n  background-color: #5bc0de !important; }\n\n.timeline-title {\n  margin-top: 0;\n  color: inherit; }\n\n.timeline-body > p,\n.timeline-body > ul {\n  margin-bottom: 0; }\n\n.timeline-body > p + p {\n  margin-top: 5px; }\n\n@media (max-width: 767px) {\n  ul.timeline:before {\n    left: 40px; }\n  ul.timeline > li > .timeline-panel {\n    width: calc(100% - 90px);\n    width: -webkit-calc(100% - 90px); }\n  ul.timeline > li > .timeline-badge {\n    top: 16px;\n    left: 15px;\n    margin-left: 0; }\n  ul.timeline > li > .timeline-panel {\n    float: right; }\n  ul.timeline > li > .timeline-panel:before {\n    right: auto;\n    left: -15px;\n    border-right-width: 15px;\n    border-left-width: 0; }\n  ul.timeline > li > .timeline-panel:after {\n    right: auto;\n    left: -14px;\n    border-right-width: 14px;\n    border-left-width: 0; } }\n"

/***/ }),

/***/ "./src/app/layout/dashboard/components/timeline/timeline.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimelineComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TimelineComponent = /** @class */ (function () {
    function TimelineComponent() {
    }
    TimelineComponent.prototype.ngOnInit = function () {
    };
    TimelineComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-timeline',
            template: __webpack_require__("./src/app/layout/dashboard/components/timeline/timeline.component.html"),
            styles: [__webpack_require__("./src/app/layout/dashboard/components/timeline/timeline.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TimelineComponent);
    return TimelineComponent;
}());



/***/ }),

/***/ "./src/app/layout/dashboard/dashboard-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_component__ = __webpack_require__("./src/app/layout/dashboard/dashboard.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '', component: __WEBPACK_IMPORTED_MODULE_2__dashboard_component__["a" /* DashboardComponent */]
    }
];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div [@routerTransition]>\n    <h2 class=\"text-muted\">Dashboard <small>Statistics Overview</small></h2>\n    <!-- <div class=\"row\">\n        <div class=\"col-md-12\">\n            <ngb-carousel>\n                <ng-template ngbSlide *ngFor=\"let slider of sliders\">\n                    <img class=\"img-fluid mx-auto d-block\" [src]=\"slider.imagePath\" alt=\"Random first slide\" width=\"100%\">\n                    <div class=\"carousel-caption\">\n                        <h3>{{slider.label}}</h3>\n                        <p>{{slider.text}}</p>\n                    </div>\n                </ng-template>\n            </ngb-carousel>\n        </div>\n    </div>\n    <hr> -->\n    <div class=\"row\">\n        <div class=\"col-xl-3 col-lg-6\">\n            <app-stat [bgClass]=\"'primary'\" [icon]=\"'fa-users'\" [count]=\"userCount\" [label]=\"'Users'\"></app-stat>\n        </div>\n        <div class=\"col-xl-3 col-lg-6\">\n            <app-stat [bgClass]=\"'warning'\" [icon]=\"'fa-tags'\" [count]=\"tagCount\" [label]=\"'Tags'\"></app-stat>\n        </div>\n        <div class=\"col-xl-3 col-lg-6\">\n            <app-stat [bgClass]=\"'info'\" [icon]=\"'fa-tasks'\" [count]=\"groupCount\" [label]=\"'Groups'\"></app-stat>\n        </div>\n        <div class=\"col-xl-3 col-lg-6\">\n            <app-stat [bgClass]=\"'danger'\" [icon]=\"'fa-line-chart'\" [count]=\"activityCount\" [label]=\"'Activities'\"></app-stat>\n        </div>\n    </div>    \n    <!-- <a class=\"btn btn-default\" href=\"http://localhost:4200/admin/verifyuser?key=QWERRTyuiR\" target='_blank'>Verify User</a> -->\n\n    <div class=\"row dasboardMargins\">\n\n        <!-- /.col-lg-8 -->\n        <div class=\"col-lg-8\">\n            <line-chart-demo></line-chart-demo>\n        </div>\n        <div class=\"col-lg-4 pull-right\">\n            <div class=\"card card-default mb-3\">\n                <div class=\"card-header\">\n                    <i class=\"fa fa-bell fa-fw\"></i> Recent Users\n                </div>\n                <div class=\"card-body\"> <!-- [routerLink]=\"['/users/details/',user.id]\" -->\n                    <div class=\"list-group\">\n                        <ul *ngIf=\"users.length > 0\">\n                            <li *ngFor=\"let user of users;let i=index;\" style=\"margin-top: 5px;\">\n                                <a href=\"javascript:void(0)\" class=\"list-group-item clearfix d-block\">\n                                    <i class=\"fa fa-user fa-fw\"></i> {{user.firstName+\" \"+user.lastName+\" \"}}\n                                    <span class=\"float-right text-muted small\"><em>{{user.createdAt | date:'mediumDate'}}</em></span>\n                                </a>\n                            </li>\n                        </ul>\n                        <ul *ngIf=\"users.length == 0\">No Record Found</ul>\n                    </div>\n                    <!-- /.list-group [routerLink]=\"['/users']\" -->\n                    <a href=\"javascript:void(0)\" class=\"btn btn-default btn-block\">View All Users</a>\n                </div>\n            </div>\n            <div class=\"card card-default mb-3\">\n                <div class=\"card-header\">\n                    <i class=\"fa fa-bell fa-fw\"></i> Activity Log\n                </div>\n                <div class=\"card-body\">\n                    <div class=\"list-group\">\n                        <ul *ngIf=\"userActivity.length > 0\">\n                            <li *ngFor=\"let activity of userActivity;let i=index;\" style=\"margin-top: 5px;\">\n                                <a href=\"#\" class=\"list-group-item clearfix d-block\">\n                                    <i class=\"fa fa-clock-o fa-fw\"></i> {{activity.activityname+\" \"}}\n                                    <span class=\"float-right text-muted small\">By-<em>{{activity.userIs}}</em></span>\n                                </a>\n                            </li>\n                        </ul>\n                        <ul *ngIf=\"userActivity.length == 0\">No Record Found</ul>\n                    </div>\n                    <!-- /.list-group -->\n                    <a [routerLink]=\"['/activity-log']\" class=\"btn btn-default btn-block\" *ngIf=\"userActivity.length > 0\">View All Activities</a>\n                </div>\n\n            </div>\n        </div>\n        <!-- /.col-lg-4 -->\n        <!-- </div> -->\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/layout/dashboard/dashboard.component.scss":
/***/ (function(module, exports) {

module.exports = ".dasboardMargins {\n  margin-top: 10px; }\n\nul {\n  list-style-type: none;\n  margin-left: -50px; }\n"

/***/ }),

/***/ "./src/app/layout/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_animations__ = __webpack_require__("./src/app/router.animations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_service__ = __webpack_require__("./src/app/layout/dashboard/dashboard.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dashboards) {
        this.dashboards = dashboards;
        this.users = [];
        this.userActivity = [];
        this.userCount = 0;
        this.tagCount = 0;
        this.groupCount = 0;
        this.activityCount = 0;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dashboards.getDashboardCount().subscribe(function (res) {
            res = res.data ? res.data : res;
            if (res.code == 200 && res.data != null) {
                _this.userCount = res.data.usersData;
                _this.tagCount = res.data.tagsData;
                _this.groupCount = res.data.groupsData;
                _this.activityCount = res.data.activitiesData;
            }
            else {
            }
        });
        this.dashboards.getRecentUsers().subscribe(function (res) {
            res = res.data ? res.data : res;
            if (res.code == 200 && res.data != null) {
                res.data.forEach(function (element) {
                    _this.users.push(element);
                });
            }
            else {
            }
        });
        this.dashboards.getRecentActivity().subscribe(function (res) {
            res = res.data ? res.data : res;
            if (res.code == 200) {
                res.data.forEach(function (element) {
                    _this.userActivity.push(element);
                });
            }
            // let rs =res.json();
            // console.log(rs);
        });
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__("./src/app/layout/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("./src/app/layout/dashboard/dashboard.component.scss")],
            animations: [Object(__WEBPACK_IMPORTED_MODULE_1__router_animations__["a" /* routerTransition */])()]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__dashboard_service__["a" /* dashboardService */]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/layout/dashboard/dashboard.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_routing_module__ = __webpack_require__("./src/app/layout/dashboard/dashboard-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_component__ = __webpack_require__("./src/app/layout/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dashboard_service__ = __webpack_require__("./src/app/layout/dashboard/dashboard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_charts__ = __webpack_require__("./node_modules/ng2-charts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_chart_chart_service__ = __webpack_require__("./src/app/layout/dashboard/components/chart/chart.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components__ = __webpack_require__("./src/app/layout/dashboard/components/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared__ = __webpack_require__("./src/app/shared/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbCarouselModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* NgbAlertModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__dashboard_routing_module__["a" /* DashboardRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_9__shared__["c" /* StatModule */],
                __WEBPACK_IMPORTED_MODULE_6_ng2_charts__["ChartsModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components__["c" /* TimelineComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components__["b" /* NotificationComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components__["a" /* LineChartDemoComponent */]
            ], providers: [__WEBPACK_IMPORTED_MODULE_5__dashboard_service__["a" /* dashboardService */], __WEBPACK_IMPORTED_MODULE_7__components_chart_chart_service__["a" /* ChartService */]]
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ }),

/***/ "./src/app/layout/dashboard/dashboard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dashboardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_config_app_config__ = __webpack_require__("./src/app/core/config/app.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var dashboardService = /** @class */ (function () {
    function dashboardService(http, config) {
        this.http = http;
        this.config = config;
        this.isLoggedIn = false;
    }
    dashboardService.prototype.getDashboardCount = function () {
        return this.http.get(this.config.apiUrl + 'getAdminDashboardCount').map(function (res) {
            var body = res;
            console.log(body, "Here is the body");
            return { data: res };
        });
    };
    dashboardService.prototype.getRecentUsers = function () {
        // console.log(this.config.)
        return this.http.get(this.config.apiUrl + 'getAdminDashboardRecentUsers').map(function (res) {
            var body = res;
            console.log(body, "Here is the body");
            return { data: res };
        });
    };
    dashboardService.prototype.getRecentActivity = function () {
        return this.http.get(this.config.apiUrl + 'getAdminDashboardRecentActivities');
    };
    dashboardService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__core_config_app_config__["a" /* AppConfig */]])
    ], dashboardService);
    return dashboardService;
}());



/***/ })

});
//# sourceMappingURL=dashboard.module.chunk.js.map