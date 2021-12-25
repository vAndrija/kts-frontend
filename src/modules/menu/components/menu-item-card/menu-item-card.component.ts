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
    category: 0,
    description: "",
    name: "",
    preparationTime: 0,
    type: 0,
    priceItemDto: {
      value: 0,
      startDate: new Date,
      endDate: new Date,
      menuItemId: 0,
      isCurrent: false,
      preparationValue: 0
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
