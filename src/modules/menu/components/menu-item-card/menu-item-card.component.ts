import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menuItem';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.scss']
})
export class MenuItemCardComponent implements OnInit {
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
      startDate: new Date,
      endDate: new Date,
      menuItemId: "",
      isCurrent: false,
      preparationValue: 0
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
