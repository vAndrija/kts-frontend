import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/modules/menu/model/menu-item';
import { MenuItemService } from 'src/modules/menu/services/menu-item-service/menu-item.service';
import { NotificationDto } from 'src/modules/shared/models/notification';
import { Pagination } from 'src/modules/shared/models/pagination';
import { MessageService } from 'src/modules/shared/services/messages/message.service';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { WebsocketService } from 'src/modules/shared/services/websocket/websocket.service';
import { AcceptOrderItem } from '../../model/accept-order-item';
import { OrderItem } from '../../model/order-item';
import { OrderItemService } from '../../services/order-item/order-item.service';

@Component({
  selector: 'app-accept-order-item-table',
  templateUrl: './accept-order-item-table.component.html',
  styleUrls: ['./accept-order-item-table.component.scss']
})
export class AcceptOrderItemTableComponent implements OnInit {

  @Output() pageChanged: EventEmitter<any> = new EventEmitter();

  orderItems: OrderItem[] = [];
  menuItems: MenuItem[] = [];
  userId: number | null = parseInt(localStorage.getItem('id') || '-1')
  userRole: string | null = localStorage.getItem('role')
  pagination: Pagination = new Pagination;

  constructor(
    private orderItemService: OrderItemService,
    private notificationService: NotificationService,
    private menuItemService: MenuItemService,
    private socketService: WebsocketService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadAllMenuItems();
    this.loadAllUnacceptedOrderItems(this.pagination.currentPage - 1);
  }

  loadAllUnacceptedOrderItems(page: number): void {
    this.orderItemService.getUnacceptedOrderItems(page, this.pagination.pageSize).subscribe(
      (result) => {
        this.orderItems = result.body["content"] as OrderItem[];
        this.pagination.totalPages = result.body["totalPages"] as number;
      });
  }

  loadAllMenuItems(): void {
    this.menuItemService.getAllMenuItems().subscribe((result) => {
      this.menuItems = result as MenuItem[];
    });
  }

  getMenuItemName(menuItemId: string): string {
    const menuItem: any = this.menuItems.find(value => value.id === menuItemId);
    return menuItem.name;
  }

  changePage(newPage: number): void {
    this.pageChanged.emit(newPage);
    this.loadAllUnacceptedOrderItems(newPage - 1);
  }

  acceptOrderItem(orderItem: OrderItem): void {
    orderItem.status = "1";

    let acceptedOrderItem: AcceptOrderItem;

    if (this.userRole === "ROLE_COOK") {
      acceptedOrderItem = {
        ...orderItem,
        cookId: parseInt((localStorage.getItem('id') || '-1').toString()),
        bartenderId: -1
      }
    }
    else {
      acceptedOrderItem = {
        ...orderItem,
        bartenderId: parseInt((localStorage.getItem('id') || '-1').toString()),
        cookId: -1
      }
    }
    this.orderItemService.acceptOrderItem(acceptedOrderItem, orderItem.id).subscribe(
      (result) => {
        this.notificationService.success("Stavka: " + result.id + " je uspešno preuzeta.");
        this.loadAllUnacceptedOrderItems(this.pagination.currentPage - 1);
        this.sendWebsocketMessage(orderItem);
      },
      (error) => {
        if (error.status === 400) {
          this.notificationService.error("Preuzimanje stavke nije uspelo. Pokušajte ponovo.");
        }
      }
    );

  }

  sendWebsocketMessage(orderItem: OrderItem): void {
    const message = {
      "message":"Stavke porudžbine id " + orderItem.id +" je preuzeta.",
      "fromId": localStorage.getItem("userId"),
      "status": "Preuzeto",
      "orderItemId": (orderItem.id).toString()
    };
    this.socketService.sendOrderItemStatusChangedMessage(message);
    const notification: NotificationDto = {
      orderItemId: orderItem.id,
      message: message.message
    }
    this.messageService.addNewNotification(notification).subscribe();
  }
}
