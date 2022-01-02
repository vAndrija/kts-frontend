import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/modules/menu/model/menuItem';
import { Item } from 'src/modules/shared/models/item';

@Component({
  selector: 'app-order-item-card',
  templateUrl: './order-item-card.component.html',
  styleUrls: ['./order-item-card.component.scss']
})
export class OrderItemCardComponent implements OnInit {
  @Input()
  public menuItem: MenuItem = {
    category: "",
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
  priority: any;
  quantity: any;
  @Output() eventEmitter : EventEmitter<Item> = new EventEmitter();

  public item: Item = {
    priority:0,
    quantity: 0,
    orderId: 0,
    status: "",
    name:"",
    category:"",
    price:0,
    menuItemId:0
  };

  constructor() { }

  ngOnInit(): void { }

  add(){
    this.item.priority = this.priority;
    this.item.quantity = this.quantity;
    this.item.status = "";
    this.item.menuItemId = this.menuItem.priceItemDto.menuItemId;
    this.item.category = this.menuItem.category;
    this.item.name = this.menuItem.name;
    this.item.price = this.menuItem.priceItemDto.value * this.quantity;
    this.eventEmitter.emit(this.item);
  }

}
