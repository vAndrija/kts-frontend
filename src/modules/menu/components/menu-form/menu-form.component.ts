import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { MenuDto } from 'src/modules/menu/model/menuDto'
import { MenuService } from 'src/modules/menu/services/menu-service/menu.service'
import { datetimePickerValidator } from 'src/modules/shared/custom-validators/datetime-picker-validator';
import * as moment from 'moment';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {

  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private notificationService: NotificationService
  ) { 
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      period: new FormControl("", {
        validators: datetimePickerValidator(),
      })
    })


  }

  ngOnInit(): void {
   
    const $ = (window as any).$;

    $('.input-daterange-timepicker').on('dateSelected', (event: any, date: string) => {
      this.form.get('period')?.patchValue(date);
    })

  }

  submit(): void{

    const name = this.form.controls['name'].value;
    const stringDates = this.form.controls['period'].value;
    const dates = this.formatDates(stringDates);

    const startDate = dates.startDate;
    const endDate = dates.endDate;

    const tempMenu = 
    {
      name: name,
      startDuration: startDate,
      endDuration: endDate
    }

    const menu: MenuDto = tempMenu;

    this.menuService.addMenu(menu).subscribe(
      (result) => {
        this.notificationService.success("Menu added!");
        console.log(result);
      },
      (error) => {
        if (error.status === 401) {
          this.notificationService.error("Wrong credentials. Try again.");
        } 
      }
    );
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error) && this.form.get(control)?.touched;
  }

  private formatDates = (dates: string) => {
    const tokens = dates.split(" ");

    const validStartDate = moment(tokens[0]).format("YYYY-MM-DDThh:mm");
    const validEndDate = moment(tokens[1]).format("YYYY-MM-DDThh:mm");

    console.log(validStartDate+ " " + validEndDate);
    return {
      startDate: validStartDate,
      endDate: validEndDate
    }
  }
}

