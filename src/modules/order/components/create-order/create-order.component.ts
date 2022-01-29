import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateOrderDto, OrderDto } from 'src/modules/shared/models/order';
import { Item } from 'src/modules/shared/models/item';
import { CreateOrderItem } from 'src/modules/shared/models/orderitem';
import { OrderItemService } from '../../services/order-item/order-item.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { Router } from '@angular/router';
import { RestaurantTableService } from 'src/modules/restaurant/services/restaurant-table.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  providers: [DatePipe]
})
export class CreateOrderComponent  {
  
  @Output() triggerOrderItemsChanged: EventEmitter<Item[]> = new EventEmitter();
  @Output() triggerSendNotification: EventEmitter<any> = new EventEmitter();

  $ = (window as any).$;

  @Input()
  orderItems: Item[] = [];
  @Input()
  discount: number = 0;
  @Input()
  tableId: number = 0;
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
  
  constructor(
    private orderItemservice: OrderItemService, 
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    private router: Router, 
    private restaurantTableService: RestaurantTableService
   ) {}

  
  close(): void {
    this.$('.order-create').removeClass('active');
  }

  delete(id: string): void {
    this.orderItems = this.orderItems.filter(orderItem => orderItem.menuItemId !== id);
    this.triggerOrderItemsChanged.emit(this.orderItems);
    this.orderDiscount();
  }

  fromItemToCreateOrderItem(orderItem: Item): CreateOrderItem {
    const item: CreateOrderItem = {
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
    const d = this.datePipe.transform(Date.now().toString(), 'yyyy-MM-ddTHH:mm');
    if (d != null) {
      this.order.dateOfOrder = d;
    }
    this.order.price = this.discount;
    this.order.tableId = this.tableId;
    this.orderItemservice.createOrder(this.order).subscribe(
      (response) => {
        this.triggerSendNotification.emit("Kreirana je nova porudžbina");
        this.createdOrder = response as OrderDto;
        this.createOrderItem();
        this.notificationService.success('Uspešno kreirana porudžbina!');
        this.close();

        this.restaurantTableService.findTableWithOrder(this.tableId).subscribe(
          (response) => {
            this.router.navigate(['/order/review'], { state: { orders: response, tableId: this.tableId } });
          },
        );
      },
    )
  }

  createOrderItem(): void {
    this.orderItems.forEach(orderItem => orderItem.orderId = this.createdOrder.id);
    this.orderItems.forEach(orderItem => this.orderItemservice.createOrderItem(this.fromItemToCreateOrderItem(orderItem)).subscribe())
  }

}
