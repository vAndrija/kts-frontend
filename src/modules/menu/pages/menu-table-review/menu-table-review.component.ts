import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { Menu } from '../../model/menu';
import { MenuService } from '../../services/menu-service/menu.service';

@Component({
  selector: 'app-menu-table-review',
  templateUrl: './menu-table-review.component.html',
  styleUrls: ['./menu-table-review.component.scss']
})
export class MenuTableReviewComponent implements OnInit {

  menus: Menu[] = [];

  constructor(
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
  }

  loadAllMenus(): void {
    this.menuService.getMenus().subscribe(
      (result) => {
        this.menus = result as Menu[];
      }
    );
  }
}
