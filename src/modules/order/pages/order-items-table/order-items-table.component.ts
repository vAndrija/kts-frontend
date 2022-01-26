import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    { key: 'dateOfOrder', header: 'Datum i vreme porudžbine' },
    { key: 'note', header: 'Napomena' },
    { key: 'quantity', header: 'Količina' },
    { key: 'priority', header: 'Prioritet' },
    { key: 'status', header: 'Status' }
  ];
  tableData: any[];
  pagination: Pagination = new Pagination;
  id: number = 0;
  orderItemStatusChanged: boolean = false;
  orderItemId: number = -1;
  status: any;

  filters: string[] = ['Poručeno', 'U pripremi', 'Pripremljeno', 'Servirano', 'Sve'];
  form: FormGroup;
  
  constructor(
    private orderItemService: OrderItemService,
    private socketService: WebsocketService
    ) {
      this.tableData = [];
      this.load(this.pagination.currentPage - 1);
      this.form = new FormGroup({
        filterName: new FormControl("", Validators.required),
      })
  }

  ngOnInit(): void {
    const userId = localStorage.getItem("id");
    this.socketService.connect(userId);
    this.load(this.pagination.currentPage - 1);
  }

  filterPageable(page: number, status: string): void {
    this.orderItemService.filterStatus(page - 1, this.pagination.pageSize, this.id, status).subscribe(res => {
      this.tableData = res.body["content"] as OrderItem[];
      this.pagination.totalPages = res.body["totalPages"] as number;
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
    this.orderItemService.changeStatusOrderItem(this.orderItemId, object.status).subscribe(res => {
      this.orderItemStatusChanged = true;
      this.load(this.pagination.currentPage - 1);
    });

  }

  changePage(newPage: number): void {
    this.load(newPage - 1);
  }

  load(page: number): void {
    this.id = Number(localStorage.getItem("id"));
    this.orderItemService
      .getOrderItemsById(page, this.pagination.pageSize, this.id)
      .subscribe((res) => {
        this.tableData = res.body["content"] as OrderItem[];
        this.pagination.totalPages = res.body["totalPages"] as number;

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





