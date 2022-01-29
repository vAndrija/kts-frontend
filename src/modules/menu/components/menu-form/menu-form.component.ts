import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

    let name = this.form.controls['name'].value;
    let stringDates = this.form.controls['period'].value;
    let dates = this.formatDates(stringDates);

    let startDate = dates.startDate;
    let endDate = dates.endDate;

    let tempMenu = 
    {
      name: name,
      startDuration: startDate,
      endDuration: endDate
    }

    const menu: MenuDto = tempMenu;

    this.menuService.addMenu(menu).subscribe(
      (result) => {
        this.notificationService.success("Meni je kreiran!");
      },
      (error) => {
        if (error.status === 400) {
          this.notificationService.error("Došlo je do greške, pokušajte ponovo.");
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

    return {
      startDate: validStartDate,
      endDate: validEndDate
    }
  }
}

