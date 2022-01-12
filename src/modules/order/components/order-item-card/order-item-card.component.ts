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
    menu: {
      durationEnd: new Date,
      durationStart: new Date,
      id: "",
      name: ""
    },
    accepted: false
  }
  priority: any;
  quantity: any;
  note:any;
  @Output() eventEmitter : EventEmitter<Item> = new EventEmitter();

  public item: Item = {
    priority:0,
    quantity: 0,
    orderId: 0,
    status: "",
    name:"",
    category:"",
    price:0,
    menuItemId:"",
    discount:0,
    note: ""
  };

  constructor() { }

  ngOnInit(): void { }

  add(): void {
    this.item.priority = this.priority;
    this.item.quantity = this.quantity;
    this.item.menuItemId = this.menuItem.priceItemDto.menuItemId;
    this.item.category = this.menuItem.category;
    this.item.name = this.menuItem.name;
    this.item.discount = this.menuItem.priceItemDto.value * this.quantity;
    this.item.price = this.menuItem.priceItemDto.value;
    this.item.note = this.note;
    this.eventEmitter.emit(this.item);
  }

}
