import { Component, OnInit } from '@angular/core';
import { OrderDto } from 'src/modules/shared/models/order';
import { Pagination } from 'src/modules/shared/models/pagination';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {

  id: number = 0;
  pagination: Pagination = new Pagination;
  tableColumns = [
    { key: 'tableId', header: 'Broj stola' },
    { key: 'dateOfOrder', header: 'Datum i vreme porudžbine' },
    { key: 'price', header: 'Cena (RSD)' },
    { key: 'status', header: 'Status' },
    { key: 'edit', header: 'Uredi' }
  ];
  tableData: any[];
  status: string = 'Sve';

  constructor(private orderService: OrderService) { this.tableData = []; }

  ngOnInit(): void {
    this.load(this.pagination.currentPage - 1);
  }

  changePage(newPage: number): void {
    if (this.status != 'Sve') {
      this.filterPageable(newPage - 1, this.status);
    } else {
      this.load(newPage - 1);
    }
  }

  load(page: number): void {
    this.id = Number(localStorage.getItem("id"));
    this.orderService
      .getOrdersByWaiter(page, this.pagination.pageSize, this.id)
      .subscribe((res) => {
        this.tableData = res.body["content"] as OrderDto[];
        this.pagination.totalPages = res.body["totalPages"] as number;
      });

  }

  changeStatus(object: any): void {
    let orderId: number = Number((object.event.target as Element).id);
    this.orderService.changeStatusOrder(orderId, object.status).subscribe(res => {
      this.load(this.pagination.currentPage - 1);
    });

  }
  filterPageable(page: number, status: string): void {
    this.orderService.filterStatus(page - 1, this.pagination.pageSize, this.id, status).subscribe(res => {
      this.tableData = res.body["content"] as OrderDto[];
      this.pagination.totalPages = res.body["totalPages"] as number;
    });
  }

  filterStatus(status: string): void {
    if (status == 'Sve') {
      this.load(this.pagination.currentPage - 1);
    } else {
      this.filterPageable(this.pagination.currentPage, status);
    }
  }

}
