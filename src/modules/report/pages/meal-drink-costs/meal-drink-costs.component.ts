import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { monthValidator } from 'src/modules/shared/custom-validators/month-validator';
import { positiveNumberValidator } from 'src/modules/shared/custom-validators/positive-number-validator';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { ChartOptions } from '../../model/chart-options';
import { ReportService } from '../../services/report-service/report.service';

@Component({
  selector: 'app-meal-drink-costs',
  templateUrl: './meal-drink-costs.component.html',
  styleUrls: ['./meal-drink-costs.component.scss']
})
export class MealDrinkCostsComponent implements OnInit {
  yearlyChartOptions!: ChartOptions;
  monthlyChartOptions!: ChartOptions;
  formYearly: FormGroup;
  formMonthly: FormGroup;

  constructor(private reportService: ReportService,
    private notificationService: NotificationService) {
      this.formYearly = new FormGroup({
        year: new FormControl(null, { validators: positiveNumberValidator()}),
     })
     this.formMonthly = new FormGroup({
        year: new FormControl(null, { validators: positiveNumberValidator()}),
        month: new FormControl(null, { validators: monthValidator()})
     })
  }

  ngOnInit(): void {
    this.yearlyChartOptions = {
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Troškovi pripreme jela i pića"
      },
      xaxis: {
          categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      series: [{
        data: []
      }]
    }

    this.monthlyChartOptions = {
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Troškovi pripreme jela i pića"
      },
      xaxis: {
          categories: []
      },
      series: [{
        data: []
      }]
    }
  }

  getYearlyMealDrinkCosts(year: number): void {
    this.reportService.getYearlyMealDrinkCosts(year).subscribe(
      (result) => {
        this.yearlyChartOptions.series = [{
          data: result as number[]
        }];
      },
      (error) => {
        if(error.status === 404){
          this.notificationService.error(error.error.message);
        }
        else {
          this.notificationService.error("Doslo je do greske, pokusajte ponovo.");
        }
      }
    )
  }

  getMonthlyMealDrinkCosts(year: number, month: number): void {
    this.reportService.getMonthlyMealDrinkCosts(year, month).subscribe(
      (result) => {
        const mealDrinkCosts: number[] = result as number[];
        this.monthlyChartOptions.series = [{
          data: mealDrinkCosts
        }];
        this.monthlyChartOptions.xaxis = {
          categories: [...mealDrinkCosts.map((cost, index) => index + 1)]
        }
      },
      (error) => {
        if(error.status === 404){
          this.notificationService.error(error.error.message);
        }
        else {
          this.notificationService.error("Doslo je do greske, pokusajte ponovo.");
        }
      }
    )
  }

  public errorHandlingYearly = (control: string, error: string) => {
    return this.formYearly.controls[control].hasError(error) && this.formYearly.get(control)?.touched;
  }

  public errorHandlingMonthly = (control: string, error: string) => {
    return this.formMonthly.controls[control].hasError(error) && this.formMonthly.get(control)?.touched;
  }

  submitYearly() {
    this.getYearlyMealDrinkCosts(this.formYearly.value.year);
  }

  submitMonthly() {
    this.getMonthlyMealDrinkCosts(this.formMonthly.value.year, this.formMonthly.value.month);
  }
}
