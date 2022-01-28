import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { MenuItem } from '../../model/menuItem';
import { MenuItemService } from '../../services/menu-item-service/menu-item.service';

@Component({
  selector: 'app-menu-item-review',
  templateUrl: './menu-item-review.component.html',
  styleUrls: ['./menu-item-review.component.scss']
})
export class MenuItemReviewComponent implements OnInit {
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
    menuDto: {
      durationEnd: new Date,
      durationStart: new Date,
      id: "",
      name: ""
    },
    accepted: false
  };
  role: string|null = localStorage.getItem("role");

  constructor(
    private menuItemService: MenuItemService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
  ) { 
    let routeParam: string | null = this.route.snapshot.paramMap.get('menuItemId');
      if (routeParam) {
          this.getMenuItem(routeParam);
      }
  }

  ngOnInit(): void {
  }

  getMenuItem(id: string): void {
      this.menuItemService.getMenuItem(id).subscribe(
      (result) => {
        this.menuItem = result as MenuItem;
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
}
