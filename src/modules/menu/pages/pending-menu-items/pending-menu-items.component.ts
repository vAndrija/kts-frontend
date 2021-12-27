import { Component, OnInit } from '@angular/core';
import { PAGE_SIZE } from 'src/modules/shared/constants/constants';
import { MenuItem } from '../../model/menuItem';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { MenuService } from '../../services/menu-service/menu.service';

@Component({
  selector: 'app-pending-menu-items',
  templateUrl: './pending-menu-items.component.html',
  styleUrls: ['./pending-menu-items.component.scss']
})
export class PendingMenuItemsComponent implements OnInit {
  menuItems: MenuItem[] = [];
  page: number = 0;
  pageSize: number = PAGE_SIZE;
  totalPages: number = 0;

  constructor(private menuService: MenuService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getPendingMenuItems();
  }

  loadMore() {
    this.pageSize += PAGE_SIZE;
    this.getPendingMenuItems();
  }

  getPendingMenuItems() {
    this.menuService.getPendingMenuItems(this.page, this.pageSize).subscribe(
      (response) => {
        this.menuItems = response.body["content"] as MenuItem[];
        this.totalPages = response.body["totalPages"] as number;
      },
      (error) => {
        this.notificationService.error("Došlo je do greške, pokušajte ponovo.");
      }
    )
  }
}
