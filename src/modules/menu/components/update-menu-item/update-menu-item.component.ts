import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { positiveNumberValidator } from 'src/modules/shared/custom-validators/positive-number-validator';
import { SelectModel } from 'src/modules/shared/models/select-model';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { Menu } from '../../model/menu';
import { MenuItem } from '../../model/menuItem';
import { PriceItem } from '../../model/priceItem';
import { UpdateMenuItemDto } from '../../model/updateMenuItemDto';
import { MenuItemService } from '../../services/menu-item-service/menu-item.service';
import { MenuService } from '../../services/menu-service/menu.service';
import { PriceItemService } from '../../services/price-item-service/price-item.service';

@Component({
  selector: 'app-update-menu-item',
  templateUrl: './update-menu-item.component.html',
  styleUrls: ['./update-menu-item.component.scss']
})
export class UpdateMenuItemComponent implements OnInit, OnChanges {
  @Input() 
  public menuItem: MenuItem = {
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
    menuDto: {
      durationEnd: new Date,
      durationStart: new Date,
      id: "",
      name: ""
    },
    accepted: false,
    imageName: ""
  };
  types: SelectModel[] = [];
  selectedMenu: string = "";
  menus: Menu[] = [];
  formAccept: FormGroup;
  menu: SelectModel = new SelectModel("", "")

  constructor(private menuItemService: MenuItemService,
    private notificationService: NotificationService,
    private menuService: MenuService,
    private priceItemService: PriceItemService,
    private router: Router) {
      this.formAccept = new FormGroup({
        name: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        preparationTime: new FormControl(null, { validators: positiveNumberValidator()}),
        price: new FormControl(null, { validators: positiveNumberValidator()}),
        menuId: new FormControl("1", Validators.required),
        preparationPrice: new FormControl(null, { validators: positiveNumberValidator()})
      });
     }

  ngOnInit(): void {
    this.getMenus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formAccept.patchValue({
      name: this.menuItem.name,
      description: this.menuItem.description,
      preparationTime: this.menuItem.preparationTime,
      price: this.menuItem.priceItemDto?.value,
      menuId: this.menuItem.menuDto?.id,
      preparationPrice: this.menuItem.priceItemDto?.preparationValue
    })
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
    this.menuItem.menuDto.id = value;
  }

  updateMenuItem(): void {
    this.menuItem.accepted = true;
    const updateMenuItemDto: UpdateMenuItemDto = {
      ...this.menuItem,
      description: this.formAccept.value.description,
      name: this.formAccept.value.name,
      preparationTime: this.formAccept.value.preparationTime,
      accepted: true,
      menuId: this.formAccept.value.menuId
    }

    this.menuItemService.updateMenuItem(updateMenuItemDto, this.menuItem.id).subscribe(
      (result) => {
        this.menuItem = result as MenuItem;
        this.notificationService.success("Uspešno ste sačuvali promene.")
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
 
  decline(redirectTo: string): void {
    this.menuItemService.deleteMenuItem(this.menuItem.id).subscribe(
      (result) => {
        this.router.navigate([redirectTo]);
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
