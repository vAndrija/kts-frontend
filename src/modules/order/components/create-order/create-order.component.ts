import { Component, Input, OnInit } from '@angular/core';
import { CreateOrderDto, OrderDto } from 'src/modules/shared/models/order';
import { Item } from 'src/modules/shared/models/item';
import { CreateOrderItem } from 'src/modules/shared/models/orderitem';
import { OrderItemService } from '../../services/order-item/order-item.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  providers: [DatePipe]
})
export class CreateOrderComponent implements OnInit {
  @Input()
  orderItems: Item[] = [];
  $ = (window as any).$;
  @Input()
  discount: number = 0;
  order: CreateOrderDto = { 
    status:'Poručeno',
    dateOfOrder: '', 
    price: this.discount,
    tableId:1,
    waiterId: Number(localStorage.getItem('id'))
  }
  createdOrder: OrderDto = { 
    id:0, 
    status:'Poručeno', 
    dateOfOrder: '', 
    price: this.discount, 
    tableId:1, 
    waiterId: Number(localStorage.getItem('id'))
  }

  constructor(private orderItemservice: OrderItemService, private datePipe: DatePipe, 
     private notificationService: NotificationService) { }

  ngOnInit(): void {}

  close() {
    this.$('.order-create').removeClass('active');
  }

  delete(id:string){
    for(var i =0; i<this.orderItems.length;i++){
      if(this.orderItems[i].menuItemId == id){
        this.orderItems.splice(i, 1); 
      }
    }
    this.orderDiscount();
  }

  fromItemToCreateOrderItem(orderItem:Item): CreateOrderItem{
     var item = {} as CreateOrderItem;
     item.orderId = this.createdOrder.id;
     item.note = '';
     item.menuItemId = orderItem.menuItemId;
     item.status = 'Poručeno';
     item.quantity = orderItem.quantity;
     item.priority = orderItem.priority;
     return item;
  }

  orderDiscount(): void{
    this.discount = 0;
    for(var i = 0; i<this.orderItems.length;i++){
      this.discount += this.orderItems[i].price;
    }
  }

  createOrder():void {
    var d = this.datePipe.transform(Date.now().toString(), 'yyyy-MM-ddTHH:mm');
    if(d != null){
      this.order.dateOfOrder = d;
    }
    this.order.price = this.discount;
    this.orderItemservice.createOrder(this.order).subscribe(
      (response) => {
        this.createdOrder  = response as OrderDto;
        this.createOrderItem();
        this.notificationService.success('Uspešno kreirana porudžbina!');
      },
    )
  }

  createOrderItem(): void {
    for(var i = 0; i<this.orderItems.length;i++){
      this.orderItems[i].orderId = this.createdOrder.id;
      this.orderItemservice.createOrderItem(this.fromItemToCreateOrderItem(this.orderItems[i])).subscribe();
    }
    this.close();
    location.reload();
  }
}
