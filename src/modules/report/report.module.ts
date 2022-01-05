import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { MealDrinkCostsComponent } from './pages/meal-drink-costs/meal-drink-costs.component';
import { ReportService } from './services/report-service/report.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BarChartComponent,
    MealDrinkCostsComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ],
  providers: [ReportService]
})
export class ReportModule { }
