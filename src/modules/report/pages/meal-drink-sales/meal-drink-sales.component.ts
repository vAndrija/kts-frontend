import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'src/modules/menu/model/menuItem';
import { MenuItemService } from 'src/modules/menu/services/menu-item-service/menu-item.service';
import { monthValidator } from 'src/modules/shared/custom-validators/month-validator';
import { positiveNumberValidator } from 'src/modules/shared/custom-validators/positive-number-validator';
import { SelectModel } from 'src/modules/shared/models/select-model';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { ChartOptions } from '../../model/chartOptions';
import { ReportService } from '../../services/report-service/report.service';

@Component({
  selector: 'app-meal-drink-sales',
  templateUrl: './meal-drink-sales.component.html',
  styleUrls: ['./meal-drink-sales.component.scss']
})
export class MealDrinkSalesComponent implements OnInit {
  yearlyChartOptions!: ChartOptions;
  monthlyChartOptions!: ChartOptions;
  formYearly: FormGroup;
  formMonthly: FormGroup;
  menuItems: MenuItem[] = [];
  menuItemsSelect: SelectModel[] = [];

  constructor(private reportService: ReportService,
    private notificationService: NotificationService,
    private menuItemService: MenuItemService) { 
    this.formYearly = new FormGroup({
        year: new FormControl(null, { validators: positiveNumberValidator()}),
        menuItemId: new FormControl(null, Validators.required)
     })
     this.formMonthly = new FormGroup({
        year: new FormControl(null, { validators: positiveNumberValidator()}),
        month: new FormControl(null, { validators: monthValidator()}),
        menuItemId: new FormControl(null, Validators.required)
     })
  }

  ngOnInit(): void {
    this.yearlyChartOptions = {
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Broj prodatih artikala"
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
        text: "Broj prodatih artikala"
      },
      xaxis: {
          categories: []
      },
      series: [{
        data: []
      }]
    }

    this.getMenuItems();
  }


  getMenuItems(): void {
    this.menuItemService.getAllMenuItems().subscribe(
      (result) => {
        this.menuItems = result as MenuItem[];
        this.menuItemsSelect = [...this.menuItems.map(menuItem => new SelectModel(menuItem.id, menuItem.name))];
      },
      (error) => {
        this.notificationService.error("Došlo je do greške, pokušajte ponovo.");
      }
    )
  }

  getYearlyCostBenefitRatio(year: number, menuItemId: string): void {
    this.reportService.getYearlyMealDrinkSalesFor(year, menuItemId).subscribe(
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

  getMonthlyCostBenefitRatio(year: number, month: number, menuItemId: string): void {
    this.reportService.getMonthlyMealDrinlSalesFor(year, month, menuItemId).subscribe(
      (result) => {
        const costBenefitRatio: number[] = result as number[];
        this.monthlyChartOptions.series = [{
          data: costBenefitRatio
        }];
        this.monthlyChartOptions.xaxis = {
          categories: [...costBenefitRatio.map((ratio, index) => index + 1)]
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
    this.getYearlyCostBenefitRatio(this.formYearly.value.year, this.formYearly.value.menuItemId);
  }

  submitMonthly() {
    this.getMonthlyCostBenefitRatio(this.formMonthly.value.year, this.formMonthly.value.month, this.formMonthly.value.menuItemId);
  }
}
