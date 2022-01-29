import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { MenuDto } from 'src/modules/menu/model/menuDto'
import { MenuService } from 'src/modules/menu/services/menu-service/menu.service'
import { datetimePickerValidator } from 'src/modules/shared/custom-validators/datetime-picker-validator';
import * as moment from 'moment';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../../model/menu';


const $ = (window as any).$;

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {

  menu: MenuDto = {
    name: "",
    durationStart: "",
    durationEnd: ""
  }
  isEdit: boolean = false;
  id: string = "";
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) { 
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      period: new FormControl("", {
        validators: datetimePickerValidator(),
      })
    })

    let routeParam: string | null = this.route.snapshot.paramMap.get('menuId');
      if (routeParam) {
          this.id = routeParam;
          this.isEdit = true;
          this.getMenu(routeParam);
          
      }
  }

  ngOnInit(): void {
    $('.input-daterange-timepicker').on('dateSelected', (event: any, date: string) => {
      this.form.get('period')?.patchValue(date);
    })
  }

  getMenu(id: string): void {
    this.menuService.getMenu(parseInt(id)).subscribe(
      (result) => {
        this.menu = result as MenuDto;
        this.edit();
      }
    );
  }

  edit(): void {
    
    const formatedStart = this.makeDate(this.menu.durationStart);
    const formatedEnd = this.makeDate(this.menu.durationEnd);
    const formatedDate = formatedStart + " " + formatedEnd;
    console.log(formatedDate);

    setTimeout(() => {
      $('input-daterange-timepicker').setPeriod({
        startDate: moment(formatedStart),
        endDate: moment(formatedEnd)
      });
    }, 300);

    this.form.patchValue({
      name: this.menu.name,
      period: formatedDate
    });
    
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
      durationStart: startDate,
      durationEnd: endDate
    }

    const menu: MenuDto = tempMenu;
   
    if(!this.isEdit) {
      this.menuService.addMenu(menu).subscribe(
        (result) => {
          this.notificationService.success("Meni " + result.name + " je kreiran!");
        },
        (error) => {
          if (error.status === 400) {
            this.notificationService.error("Došlo je do greške, pokušajte ponovo.");
          } 
        }
      );
    }
    else{
      this.menuService.updateMenu(menu, parseInt(this.id)).subscribe(
        (result) => {
          this.notificationService.success("Meni " + result.name + " je izmenjen!");
        },
        (error) => {
          if (error.status === 400) {
            this.notificationService.error("Došlo je do greške, pokušajte ponovo.");
          } 
        }
      );
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error) && this.form.get(control)?.touched;
  }

  private makeDate(date: string): string {
    const formatNumber = (value: string): string => `${value.toString().length === 1 ? 0 : ''}${value}`;
    const formatedDate = date[0] + "-" +  formatNumber(date[1]) + "-" +formatNumber(date[2]) + "T" +  formatNumber(date[3]) + ":" + formatNumber(date[4]);
    
    return formatedDate;
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

