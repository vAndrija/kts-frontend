import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/modules/menu/model/menuItem';
import { MenuItemService } from 'src/modules/menu/services/menu-item-service/menu-item.service';
import { Item } from 'src/modules/shared/models/item';
import { OrderDto } from 'src/modules/shared/models/order';
import { OrderItem } from 'src/modules/shared/models/orderitem';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { OrderItemService } from '../../services/order-item/order-item.service';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {

  routeState: any;
  orders: OrderDto[] = [];
  orderItems: Item[] = [];
  tableId: number = 0;

  constructor(private router: Router, private orderItemService: OrderItemService,
    private menuItemService: MenuItemService, private notificationService: NotificationService) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.routeState = this.router.getCurrentNavigation()?.extras.state;
      if (this.routeState) {
        this.orders = this.routeState.orders;
        this.tableId = this.routeState.tableId;
      }
    }
  }

  ngOnInit(): void {
    this.load();
  }


  fromOrderItemToItem(orderItem: OrderItem, menuItem: MenuItem): Item {
    const item: Item = {
      ...orderItem,
      name: menuItem.name,
      category: menuItem.category,
      price: menuItem.priceItemDto.value,
      discount: menuItem.priceItemDto.value * orderItem.quantity,
      menuItemId: menuItem.id,
      imageName:menuItem.imageName,

    };
    return item;

  }

  makeOrder(): void {
    this.router.navigate(['order/order'], { state: { tableId: this.tableId } });
  }

  delete(id: number) {
    this.orderItemService.deleteOrderItem(id).subscribe(
      () => {
        this.orderItems = this.orderItems.filter(orderItem => orderItem.id !== id);
        this.notificationService.success('Uspešno otkazana stavka porudžbine!');
      },
      () => {
        this.notificationService.error('Greška priliko otkazivanja!');
      }

    );
  }

  load(): void {
    this.orders.forEach(order => this.orderItemService.findOrderItemsByOrder(order.id).subscribe(
      (response) => {
        (response as OrderItem[]).forEach(orderItem => this.menuItemService.getMenuItem(orderItem.menuItemId).subscribe(
          (response) => {
            this.orderItems.push(this.fromOrderItemToItem(orderItem, response as MenuItem));
          }
        ))
      }
    ))

  }
}
