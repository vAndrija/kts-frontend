import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PAGE_SIZE } from 'src/modules/shared/constants/constants';
import { Pagination } from 'src/modules/shared/models/pagination';
import { SelectModel } from 'src/modules/shared/models/select-model';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { WebsocketService } from 'src/modules/shared/services/websocket/websocket.service';
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
  categories: SelectModel[] = [new SelectModel("0", ""), new SelectModel("1", "Supa"), new SelectModel("2", "Doručak"), new SelectModel("3", "Predjelo"),
                                new SelectModel("4", "Glavno jelo"), new SelectModel("5", "Dezert"), new SelectModel("6", "Koktel"),
                                new SelectModel("7", "Topli napitak"), new SelectModel("8", "Bezalkoholno piće")];
  searchParam: String = "";
  searchForm: FormGroup;
  category: String = "";

  constructor(
    private menuService: MenuService, 
    private notificationService: NotificationService,
    private menuItemService: MenuItemService,
    private socketService: WebsocketService
    ) { 
    this.form = new FormGroup({
      menuId: new FormControl("0", Validators.required),
    })
    this.searchForm = new FormGroup({
      searchParam: new FormControl(""),
      category: new FormControl("")
    })
  }

  ngOnInit(): void {
    this.getMenus();
  }

  loadMore(): void {
    this.pagination.pageSize = this.pagination.pageSize + PAGE_SIZE;
    this.searchMenuItems()
  }

  changeMenu(): void
  {
     this.searchMenuItems();
  }

  getMenus(): void {
    this.menuService.getActiveMenus(moment().format("YYYY-MM-DDTHH:mm")).subscribe(
      (result) => {
        this.menus = result.body as Menu[];
        this.setSelcetOptions();
        if(this.menus.length > 0) {
          this.form.patchValue({menuId: this.menus[0].id})
          this.searchMenuItems()
        }
      },
      (error) => {
        this.notificationService.error("Doslo je do greske, pokusajte ponovo.")
      }
    )
  }

  setSelcetOptions(): void {
    console.log(this.menus.length)
    this.menus.forEach(menu => {
      this.types.push(new SelectModel(menu.id, menu.name))
    });
    this.menu = this.types[0];
  }

  searchMenuItems() {
    this.menuItemService.getMenuItemsByMenuAndSearchFilterParams(this.form.value.menuId, this.searchForm.value.searchParam, 
      this.searchForm.value.category, this.pagination.currentPage - 1, this.pagination.pageSize).subscribe(
      (result) => {
        this.menuItems = result.body.content as MenuItem[];
        this.pagination.totalPages = result.body.totalPages as number;
      },
      (error) => {
        this.notificationService.error("Doslo je do greske, pokusajte ponovo.")
      }
    )
  }
}
