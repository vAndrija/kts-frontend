import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { MenuItem } from '../../model/menuItem';
import { MenuItemService } from '../../services/menu-item-service/menu-item.service';
import { ActivatedRoute } from '@angular/router';

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
    type: ""
  };

  constructor(private menuItemService: MenuItemService,
    private notificationService: NotificationService,
    private route: ActivatedRoute) { 
      let routeParam: string|null = this.route.snapshot.paramMap.get('menuItemId');
      if (routeParam) {
          this.getMenuItem(routeParam);
      }
      
  }

  ngOnInit(): void {
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
}
