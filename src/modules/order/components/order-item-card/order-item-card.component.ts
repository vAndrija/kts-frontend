import { Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'src/modules/menu/model/menu-item';
import { Item } from '../../model/item';

@Component({
  selector: 'app-order-item-card',
  templateUrl: './order-item-card.component.html',
  styleUrls: ['./order-item-card.component.scss']
})
export class OrderItemCardComponent implements OnChanges {
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
  form: FormGroup
  @Output() eventEmitter : EventEmitter<Item> = new EventEmitter();

  public item: Item = {
    id:0,
    priority:0,
    quantity: 0,
    orderId: 0,
    status: "",
    name:"",
    category:"",
    price:0,
    menuItemId:"",
    discount:0,
    note: "",
    dateOfOrder:"",
    imageName:""
  };

  constructor(){
    this.form = new FormGroup({
      quantity: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      note: new FormControl(),
    })
  }

  add(): void {
    const priority = this.form.controls['priority'].value;
    const quantity = this.form.controls['quantity'].value;
    const note = this.form.controls['note'].value;
    this.item.priority = priority;
    this.item.quantity = quantity;
    this.item.menuItemId = this.menuItem.priceItemDto.menuItemId;
    this.item.category = this.menuItem.category;
    this.item.name = this.menuItem.name;
    this.item.discount = this.menuItem.priceItemDto.value * quantity;
    this.item.price = this.menuItem.priceItemDto.value;
    this.item.note = note;
    this.item.imageName = this.menuItem.imageName;
    this.eventEmitter.emit(this.item);
  }

  ngOnChanges(): void {
    if(this.menuItem.imageName === "") {
      this.menuItem.imageName = "default.jpg"
    }
  }

}
