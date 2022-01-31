import { Component, Input, OnChanges } from '@angular/core';
import { MenuItem } from '../../model/menu-item';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.scss']
})
export class MenuItemCardComponent implements OnChanges {
  @Input()
  public menuItem: MenuItem = {
    id: "",
    category: "",
    description: "",
    name: "",
    preparationTime: 0,
    type: "",
    priceItemDto: {
      value: 0,
      startDate: "",
      endDate: "",
      menuItemId: "",
      current: false,
      preparationValue: 0
    },
    menuDto: {
      durationEnd: new Date,
      durationStart: new Date,
      id: "",
      name: ""
    },
    accepted: false,
    imageName: ""
  }


  ngOnChanges(): void {
    if(this.menuItem.imageName === "") {
      this.menuItem.imageName = "default.jpg"
    }
  }


}
