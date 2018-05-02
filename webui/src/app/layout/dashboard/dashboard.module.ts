import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {dashboardService } from './dashboard.service';
import { ChartsModule } from 'ng2-charts';
import {ChartService} from './components/chart/chart.service'


import {
    TimelineComponent,
    NotificationComponent,
    LineChartDemoComponent
} from './components';
import { StatModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        StatModule,
        ChartsModule
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        LineChartDemoComponent
    ],providers:[dashboardService, ChartService]
})
export class DashboardModule {}
