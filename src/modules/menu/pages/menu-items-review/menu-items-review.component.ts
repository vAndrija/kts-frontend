import { Component, OnInit } from '@angular/core';
import { PAGE_SIZE } from 'src/modules/shared/constants/constants';
import { SelectModel } from 'src/modules/shared/models/select-model';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { Menu } from '../../model/menu';
import { MenuItem } from '../../model/menuItem';
import { MenuService } from '../../services/menu-service/menu.service';

@Component({
  selector: 'app-menu-items-review',
  templateUrl: './menu-items-review.component.html',
  styleUrls: ['./menu-items-review.component.scss']
})
export class MenuItemsReviewComponent implements OnInit {
  menuItems: MenuItem[] = [];
  menus: Menu[] = [];
  menu: SelectModel = new SelectModel("", "");
  types: SelectModel[] = [];
  page: number = 0;
  pageSize: number = PAGE_SIZE;
  selectedMenu: string = "";

  constructor(private menuService: MenuService, private notificationService: NotificationService) { 
  }

  ngOnInit(): void {
    this.getMenus();
  }

  changePage() {
    this.pageSize = this.pageSize + PAGE_SIZE;
    this.getMenuItems()
  }

  getMenuItems() {
    this.menuService.getMenuItems(this.selectedMenu, this.page, this.pageSize).subscribe(
      (result) => {
        this.menuItems = result.body as MenuItem[];
      },
      (error) => {
        this.notificationService.error("Doslo je do greske, pokusajte ponovo.");
      }
    )
  }

  changeMenu(value: string) 
  {
     this.selectedMenu = value;
     this.getMenuItems();
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
    this.menu = this.types[0];
  }
}
