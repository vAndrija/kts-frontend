import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { MenuItem } from '../../model/menuItem';
import { MenuItemService } from '../../services/menu-item-service/menu-item.service';
import { ActivatedRoute } from '@angular/router';
import { SelectModel } from 'src/modules/shared/models/select-model';
import { MenuService } from '../../services/menu-service/menu.service';
import { Menu } from '../../model/menu';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateMenuItemDto } from '../../model/updateMenuItemDto';

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
      endDate: new Date,
      isCurrent: false,
      menuItemId: "",
      preparationValue: 0,
      startDate: new Date,
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
    private menuService: MenuService) { 
      let routeParam: string|null = this.route.snapshot.paramMap.get('menuItemId');
      if (routeParam) {
          this.getMenuItem(routeParam);
      }
      this.formAccept = new FormGroup({
        price: new FormControl(null, Validators.compose([Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")])),
        menuId: new FormControl("1", Validators.required)
    });
  }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenuItem(id: string) {
    this.menuItemService.getMenuItem(id).subscribe(
      (result) => {
        this.menuItem = result as MenuItem;
      },
      (error) => {
        this.notificationService.error("Doslo je do greske, pokusajte ponovo.");
      }
    )
  }

  getMenus() {
    this.menuService.getMenus().subscribe(
      (result) => {
        this.menus = result as Menu[];
        this.setSelcetOptions();
      },
      (error) => {
        this.notificationService.error("Doslo je do greske, pokusajte ponovo.")
      }
    )
  }

  setSelcetOptions() {
    this.menus.forEach(menu => {
      this.types.push(new SelectModel(menu.id, menu.name))
    });
  }

  changeMenu(value: string) 
  {
     this.menuItem.menu.id = value;
  }

  submit() {
    let updateMenuItemDto: UpdateMenuItemDto = {
      accepted: true,
      category: this.menuItem.category,
      description: this.menuItem.description,
      menuId: this.menuItem.menu.id,
      name: this.menuItem.name,
      preparationTime: this.menuItem.preparationTime,
      type: this.menuItem.type
    }
    this.menuItemService.updateMenuItem(updateMenuItemDto, this.menuItem.id).subscribe(
      (result) => {
        this.menuItem = result as MenuItem;
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

  public errorHandling = (control: string, error: string) => {
    return this.formAccept.controls[control].hasError(error) && this.formAccept.get(control)?.touched;
  }
}
