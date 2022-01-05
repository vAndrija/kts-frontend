import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() eventEmitter1: EventEmitter<Item[]> = new EventEmitter();
  $ = (window as any).$;
  @Input()
  discount: number = 0;
  order: CreateOrderDto = {
    status: 'Poručeno',
    dateOfOrder: '',
    price: this.discount,
    tableId: 1,
    waiterId: Number(localStorage.getItem('id'))
  }
  createdOrder: OrderDto = {
    id: 0,
    status: 'Poručeno',
    dateOfOrder: '',
    price: this.discount,
    tableId: 1,
    waiterId: Number(localStorage.getItem('id'))
  }

  constructor(private orderItemservice: OrderItemService, private datePipe: DatePipe,
    private notificationService: NotificationService) { }

  ngOnInit(): void { }

  close(): void {
    this.$('.order-create').removeClass('active');
  }

  delete(id: string): void {
    this.orderItems = this.orderItems.filter(orderItem => orderItem.menuItemId !== id);
    this.eventEmitter1.emit(this.orderItems);
    this.orderDiscount();
  }

  fromItemToCreateOrderItem(orderItem: Item): CreateOrderItem {
    var item: CreateOrderItem = {
      orderId: this.createdOrder.id,
      note: orderItem.note,
      menuItemId: orderItem.menuItemId,
      status: 'Poručeno',
      quantity: orderItem.quantity,
      priority: orderItem.priority
    };
    return item;
  }

  orderDiscount(): void {
    this.discount = 0;
    this.orderItems.forEach(orderItem => this.discount += orderItem.discount);
  }

  createOrder(): void {
    var d = this.datePipe.transform(Date.now().toString(), 'yyyy-MM-ddTHH:mm');
    if (d != null) {
      this.order.dateOfOrder = d;
    }
    this.order.price = this.discount;
    this.orderItemservice.createOrder(this.order).subscribe(
      (response) => {
        this.createdOrder = response as OrderDto;
        this.createOrderItem();
        this.notificationService.success('Uspešno kreirana porudžbina!');
      },
    )
  }

  createOrderItem(): void {
    this.orderItems.forEach(orderItem => orderItem.orderId = this.createdOrder.id);
    this.orderItems.forEach(orderItem => this.orderItemservice.createOrderItem(this.fromItemToCreateOrderItem(orderItem)).subscribe())
    this.close();
    location.reload();
  }

}
