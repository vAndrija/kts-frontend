import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { monthValidator } from 'src/modules/shared/custom-validators/month-validator';
import { positiveNumberValidator } from 'src/modules/shared/custom-validators/positive-number-validator';
import { SelectModel } from 'src/modules/shared/models/select-model';
import { User } from 'src/modules/shared/models/user';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { UserListService } from 'src/modules/user/services/userList/user-list.service';
import { ChartOptions } from '../../model/chartOptions';
import { ReportService } from '../../services/report-service/report.service';

@Component({
  selector: 'app-preparing-time-report',
  templateUrl: './preparing-time-report.component.html',
  styleUrls: ['./preparing-time-report.component.scss']
})
export class PreparingTimeReportComponent implements OnInit {
  yearlyChartOptions!: ChartOptions;
  monthlyChartOptions!: ChartOptions;
  formYearly: FormGroup;
  formMonthly: FormGroup;
  cooksAndBartendersSelect: SelectModel[] = [];

  constructor(private reportService: ReportService,
    private notificationService: NotificationService,
    private userService: UserListService) { 
    this.formYearly = new FormGroup({
        year: new FormControl(null, { validators: positiveNumberValidator()}),
        employeId: new FormControl(null, Validators.required)
     })
     this.formMonthly = new FormGroup({
        year: new FormControl(null, { validators: positiveNumberValidator()}),
        month: new FormControl(null, { validators: monthValidator()}),
        employeId: new FormControl(null, Validators.required)
     })
  }

  ngOnInit(): void {
    this.yearlyChartOptions = {
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Broj minuta provedenih u pripremi artikala za izabranog zaposlenog"
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
        text: "Broj minuta provedenih u pripremi artikala za izabranog zaposlenog"
      },
      xaxis: {
          categories: []
      },
      series: [{
        data: []
      }]
    }

    this.getCooks();
    this.getBartenders();
  }

  getCooks(): void {
    this.userService.getCooks().subscribe(
      (result) => {
        const cooks = result as User[];
        cooks.forEach(cook => this.cooksAndBartendersSelect.push(new SelectModel(cook.id.toString(), cook.name)));
      },
      (error) => {
        this.notificationService.error("Došlo je do greške, pokušajte ponovo.");
      }
    )
  }

  getBartenders(): void {
    this.userService.getBartenders().subscribe(
      (result) => {
        const bartenders = result as User[];
        bartenders.forEach(bartender => this.cooksAndBartendersSelect.push(new SelectModel(bartender.id.toString(), bartender.name)));
      }
    )
  }

  getYearlyPreparingTimeFor(year: number, employeId: string): void {
    this.reportService.getYearlyPreparingTimeFor(year, employeId).subscribe(
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

  getMonthlyPreparingTimeFor(year: number, month: number, employeId: string): void {
    this.reportService.getMonthlyPreparingTimeFor(year, month, employeId).subscribe(
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
    this.getYearlyPreparingTimeFor(this.formYearly.value.year, this.formYearly.value.employeId);
  }

  submitMonthly() {
    this.getMonthlyPreparingTimeFor(this.formMonthly.value.year, this.formMonthly.value.month, this.formMonthly.value.employeId);
  }
}
