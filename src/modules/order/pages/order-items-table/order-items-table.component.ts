import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'src/modules/shared/models/orderitem';
import { Pagination } from 'src/modules/shared/models/pagination';
import { OrderItemService } from '../../services/order-item/order-item.service';

@Component({
  selector: 'app-order-items-table',
  templateUrl: './order-items-table.component.html',
  styleUrls: ['./order-items-table.component.scss']
})
export class OrderItemsTableComponent implements OnInit {
   pagination: Pagination = new Pagination;
   orderItems: OrderItem[];
   id:number = 0;

  constructor(private orderItemService:OrderItemService) { 
    this.orderItems = [];
  }

  ngOnInit(): void {

      this.refresh();
   }

   changeStatus(event:Event, status:string): void {
    let orderItemId: number = Number((event.target as Element).id);
    this.orderItemService.changeStatusOrderItem(orderItemId, status).subscribe(res=>{
      this.refresh();
    });
    
   }

   changePage(newPage: number): void {
    this.orderItemService.getOrderItemsById(newPage - 1, this.pagination.pageSize, this.id)
    .subscribe((res) => {
      this.orderItems = res.body as OrderItem[];
      this.pagination.totalPages = Number(res.headers.get("Total-items"));
    });
  }

   refresh(): void {
    this.id = Number(localStorage.getItem("id"));
    this.orderItemService
      .getOrderItemsById(this.pagination.currentPage - 1, this.pagination.pageSize,  this.id)
      .subscribe((res) => {
        this.orderItems = res.body as OrderItem[];
        this.pagination.totalPages = Number(res.headers.get("Total-items"));
      });

   }


}




    
