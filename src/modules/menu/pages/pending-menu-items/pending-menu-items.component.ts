import { Component, OnInit } from '@angular/core';
import { PAGE_SIZE } from 'src/modules/shared/constants/constants';
import { MenuItem } from '../../model/menuItem';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { MenuService } from '../../services/menu-service/menu.service';
import { Pagination } from 'src/modules/shared/models/pagination';

@Component({
  selector: 'app-pending-menu-items',
  templateUrl: './pending-menu-items.component.html',
  styleUrls: ['./pending-menu-items.component.scss']
})
export class PendingMenuItemsComponent implements OnInit {
  menuItems: MenuItem[] = [];
  pagination: Pagination = new Pagination;

  constructor(
    private menuService: MenuService, 
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this.getPendingMenuItems();
  }

  loadMore(): void {
    this.pagination.pageSize += PAGE_SIZE;
    this.getPendingMenuItems();
  }

  getPendingMenuItems(): void {
    this.menuService.getPendingMenuItems(this.pagination.currentPage - 1, this.pagination.pageSize).subscribe(
      (response) => {
        this.menuItems = response.body["content"] as MenuItem[];
        this.menuItems.map(menuItem => {menuItem.priceItemDto = {
              menuItemId: "",
              endDate: "",
              current: false,
              preparationValue: 0,  
              startDate: "",
              value: 0
            }; return menuItem; })
        this.pagination.totalPages = response.body["totalPages"] as number;
      },
      () => {
        this.notificationService.error("Došlo je do greške, pokušajte ponovo.");
      }
    )
  }
}
