import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderItem } from 'src/modules/shared/models/orderitem';
import { Pagination } from 'src/modules/shared/models/pagination';
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
  filters: string[] = ['Poručeno', 'U pripremi', 'Pripremljeno', 'Servirano', 'Sve'];
  form: FormGroup;

  constructor(private orderItemService: OrderItemService) {
    this.tableData = [];
    this.load(this.pagination.currentPage - 1);
    this.form = new FormGroup({
      filterName: new FormControl("", Validators.required),
    })

  }

  ngOnInit(): void {
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
    let orderItemId: number = Number((object.event.target as Element).id);
    this.orderItemService.changeStatusOrderItem(orderItemId, object.status).subscribe(res => {
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

  }



}





