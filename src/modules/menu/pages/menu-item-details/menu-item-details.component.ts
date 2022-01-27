import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { MenuItem } from '../../model/menuItem';
import { MenuItemService } from '../../services/menu-item-service/menu-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectModel } from 'src/modules/shared/models/select-model';
import { MenuService } from '../../services/menu-service/menu.service';
import { Menu } from '../../model/menu';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateMenuItemDto } from '../../model/updateMenuItemDto';
import { datetimePickerValidator } from 'src/modules/shared/custom-validators/datetime-picker-validator';
import * as moment from 'moment';
import { PriceItem } from '../../model/priceItem';
import { PriceItemService } from '../../services/price-item-service/price-item.service';
import { HttpResponse } from '@angular/common/http';
import { positiveNumberValidator } from 'src/modules/shared/custom-validators/positive-number-validator';

@Component({
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrls: ['./menu-item-details.component.scss']
})
export class MenuItemDetailsComponent implements OnInit {
  menuItem: MenuItem = {
    id: "",
    category: "",
    description: "",
    name: "",
    preparationTime: 0,
    priceItemDto: {
      endDate: "",
      current: false,
      menuItemId: "",
      preparationValue: 0,
      startDate: "",
      value: 0
    },
    type: "",
    menu: {
      durationEnd: new Date,
      durationStart: new Date,
      id: "",
      name: ""
    },
    accepted: false
  };
  role: string|null = localStorage.getItem("role");
  types: SelectModel[] = [];
  selectedMenu: string = "";
  menus: Menu[] = [];
  formAccept: FormGroup;
  menu: SelectModel = new SelectModel("", "")

  constructor(private menuItemService: MenuItemService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private priceItemService: PriceItemService,
    private router: Router) { 
      let routeParam: string | null = this.route.snapshot.paramMap.get('menuItemId');
      if (routeParam) {
          this.getMenuItem(routeParam);
      }
      this.formAccept = new FormGroup({
        price: new FormControl(null, { validators: positiveNumberValidator()}),
        menuId: new FormControl("1", Validators.required),
        preparationPrice: new FormControl(null, { validators: positiveNumberValidator()})
    });
  }

  ngOnInit(): void {
    this.getMenus();

    const $ = (window as any).$;

    setTimeout(() => 
      $('.input-daterange-timepicker').on('dateSelected', (event: any, date: string) => {
        this.formAccept.get('period')?.patchValue(date);
      }), 50);
  }

  getMenuItem(id: string): void {
    this.menuItemService.getMenuItem(id).subscribe(
      (result) => {
        this.menuItem = result as MenuItem;
        console.log(this.menuItem)
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

  getMenus(): void {
    this.menuService.getMenus().subscribe(
      (result) => {
        this.menus = result as Menu[];
        this.setSelectOptions();
      },
      (error) => {
        this.notificationService.error("Došlo je do greške, pokušajte ponovo.")
      }
    )
  }

  setSelectOptions(): void {
    this.types.push(...this.menus.map(menu => new SelectModel(menu.id, menu.name)));
  }

  changeMenu(value: string): void {
    this.menuItem.menu.id = value;
  }

  updateMenuItem(): void {
    this.menuItem.accepted = true;
    const updateMenuItemDto: UpdateMenuItemDto = {
      ...this.menuItem,
      menuId: this.formAccept.value.menuId
    }

    this.menuItemService.updateMenuItem(updateMenuItemDto, this.menuItem.id).subscribe(
      (result) => {
        this.menuItem = result as MenuItem;
      },
      (error) => {
        if(error.status === 400) {
          this.notificationService.error(error.error.message);
        }
        else {
          this.notificationService.error("Došlo je do greške. Pokušajte ponovo.")
        }
      }
    )
  }

  createPriceItem(): void {
    let priceItem: PriceItem = {
      current: true,
      menuItemId: this.menuItem.id,
      value: this.formAccept.value.price,
      preparationValue: this.formAccept.value.preparationPrice,
      startDate: "",
      endDate: ""
    }

    this.priceItemService.createPriceItem(priceItem).subscribe(
      (result) => {
        this.menuItem.priceItemDto = result as PriceItem;
      },
      (error) => {
        if(error.status === 400) {
          this.notificationService.error(error.message);
        }
        else {
          this.notificationService.error("Došlo je do greške. Pokušajte ponovo.")
        }
      }
    )
  }

  submit(): void {
    this.updateMenuItem();
    this.createPriceItem();
  }
 
  decline(): void {
    this.menuItemService.deleteMenuItem(this.menuItem.id).subscribe(
      (result) => {
        this.router.navigate(["/menu/pending-menu-items"]);
      },
      (error) => {
        if(error.status === 400) {
          this.notificationService.error(error.body.message);
        }
        else {
          this.notificationService.error("Došlo je do greške. Pokušajte ponovo.")
        }
      }
    )
  }

  public errorHandling = (control: string, error: string) => {
    return this.formAccept.controls[control].hasError(error) && this.formAccept.get(control)?.touched;
  }
}
