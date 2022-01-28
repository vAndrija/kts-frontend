import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menuItem';

@Component({
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrls: ['./menu-item-details.component.scss']
})
export class MenuItemDetailsComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
