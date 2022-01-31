import { Component, Input } from '@angular/core';
import { MenuItem } from '../../model/menu-item';

@Component({
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrls: ['./menu-item-details.component.scss']
})
export class MenuItemDetailsComponent{
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


}
