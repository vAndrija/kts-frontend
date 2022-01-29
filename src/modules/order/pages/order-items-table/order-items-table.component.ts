import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { MenuItem } from 'src/modules/menu/model/menuItem';
import { MenuItemService } from 'src/modules/menu/services/menu-item-service/menu-item.service';
import { Item } from 'src/modules/shared/models/item';
import { OrderItem } from 'src/modules/shared/models/orderitem';
import { Pagination } from 'src/modules/shared/models/pagination';
import { WebsocketService } from 'src/modules/shared/services/websocket/websocket.service';
import { OrderItemService } from '../../services/order-item/order-item.service';

@Component({
  selector: 'app-order-items-table',
  templateUrl: './order-items-table.component.html',
  styleUrls: ['./order-items-table.component.scss']
})
export class OrderItemsTableComponent implements OnInit {

  tableColumns = [
    { key: 'id', header: 'Id' },
    { key: 'name', header: 'Naziv' },
    { key: 'dateOfOrder', header: 'Datum i vreme porudžbine' },
    { key: 'note', header: 'Napomena' },
    { key: 'quantity', header: 'Količina' },
    { key: 'priority', header: 'Prioritet' },
    { key: 'status', header: 'Status' }
  ];
  tableData: any = [];
  pagination: Pagination = new Pagination;
  id: number = 0;
  orderItemStatusChanged: boolean = false;
  orderItemId: number = -1;
  status: any;

  filters: string[] = ['Poručeno', 'U pripremi', 'Pripremljeno', 'Servirano', 'Sve'];
  form: FormGroup;
  role: string = "";
  data: any = [];
  
  constructor(
    private orderItemService: OrderItemService,
    private socketService: WebsocketService,
    private menuItemService: MenuItemService
    ) {
      const role = localStorage.getItem('role');
      if (role) {
        this.role = role;
      }
      this.tableData = [];
      this.load(this.pagination.currentPage - 1);
      this.form = new FormGroup({
        filterName: new FormControl("", Validators.required),
      })
  }

  ngOnInit(): void {
    const userId = localStorage.getItem("id");
    this.socketService.connect(userId);
     if (this.role == 'ROLE_WAITER') {
      this.filters = ['Pripremljeno', 'Servirano', 'Sve'];
    }
    this.load(this.pagination.currentPage - 1);
  }

  filterPageable(page: number, status: string): void {
    this.tableData = [];
    this.orderItemService.filterStatus(page - 1, this.pagination.pageSize, this.id, status).subscribe(response => {
      (response.body['content'] as OrderItem[]).forEach(orderItem =>
        this.menuItemService.getMenuItem(orderItem.menuItemId).pipe(
          map(response => this.fromOrderItemToItem(orderItem, response as MenuItem))
        ).subscribe(resp => this.tableData = [...this.tableData, resp])
      );
      this.pagination.totalPages = response.body['totalPages'] as number;
    });
  }

  filterStatus(): void {
    if (this.form.value.filterName == 'Sve') {
      this.load(this.pagination.currentPage - 1);
    } else {
      this.filterPageable(this.pagination.currentPage, this.form.value.filterName);
    }
  }


  changeStatus(object: any): void {
    this.orderItemId = Number((object.event.target as Element).id);
    this.status = object.status;
    this.orderItemService.changeStatusOrderItem(this.orderItemId, object.status).subscribe(() => {
      this.orderItemStatusChanged = true;
      this.load(this.pagination.currentPage - 1);
    });

  }

  changePage(newPage: number): void {
    this.load(newPage - 1);
  }

  fromOrderItemToItem(orderItem: OrderItem, menuItem: MenuItem): Item {
    const item: Item = {
      ...orderItem,
      name: menuItem.name,
      category: menuItem.category,
      price: menuItem.priceItemDto.value,
      discount: menuItem.priceItemDto.value * orderItem.quantity,
    };
    return item;

  }

  load(page: number): void {
    this.tableData = [];
    this.id = Number(localStorage.getItem('id'));
    this.orderItemService
      .getOrderItemsById(page, this.pagination.pageSize, this.id)
      .subscribe((response) => {
        (response.body['content'] as OrderItem[]).forEach(orderItem =>
          this.menuItemService.getMenuItem(orderItem.menuItemId).pipe(
            map(response => this.fromOrderItemToItem(orderItem, response as MenuItem))
          ).subscribe(resp => this.tableData = [...this.tableData, resp])
        );
        this.pagination.totalPages = response.body['totalPages'] as number;

      });

      if(this.orderItemStatusChanged) {
        const message = {
          "message":"Status stavke porudžbine id " + this.orderItemId +" je promjenjen u " + this.status,
          "fromId": localStorage.getItem("userId"),
          "status": this.status,
          "orderItemId": (this.orderItemId).toString()
        };
        this.socketService.sendOrderItemStatusChangedMessage(message);
      }

  }
}





