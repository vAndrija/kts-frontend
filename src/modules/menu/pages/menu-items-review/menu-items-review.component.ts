import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PAGE_SIZE } from 'src/modules/shared/constants/constants';
import { Pagination } from 'src/modules/shared/models/pagination';
import { SelectModel } from 'src/modules/shared/models/select-model';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { Menu } from '../../model/menu';
import { MenuItem } from '../../model/menuItem';
import { MenuItemService } from '../../services/menu-item-service/menu-item.service';
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
  pagination: Pagination = new Pagination;
  selectedMenu: string = "";
  form: FormGroup;

  constructor(private menuService: MenuService, private notificationService: NotificationService,
    private menuItemService: MenuItemService) { 
    this.form = new FormGroup({
      menuId: new FormControl("0", Validators.required),
    })
  }

  ngOnInit(): void {
    this.getMenus();
  }

  loadMore(): void {
    this.pagination.pageSize = this.pagination.pageSize + PAGE_SIZE;
    this.getMenuItems()
  }

  getMenuItems(): void {
    this.menuItemService.getMenuItemsByMenu(this.form.value.menuId, this.pagination.currentPage - 1, this.pagination.pageSize).subscribe(
      (result) => {
        this.menuItems = result.body as MenuItem[];
      },
      (error) => {
        this.notificationService.error("Doslo je do greske, pokusajte ponovo.");
      }
    )
  }

  changeMenu(): void
  {
     this.getMenuItems();
  }

  getMenus(): void {
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

  setSelcetOptions(): void {
    this.menus.forEach(menu => {
      this.types.push(new SelectModel(menu.id, menu.name))
    });
    this.menu = this.types[0];
  }
}
