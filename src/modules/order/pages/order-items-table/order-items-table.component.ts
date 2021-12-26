import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'src/modules/shared/models/orderitem';
import { OrderItemService } from '../../services/order-item/order-item.service';

@Component({
  selector: 'app-order-items-table',
  templateUrl: './order-items-table.component.html',
  styleUrls: ['./order-items-table.component.scss']
})
export class OrderItemsTableComponent implements OnInit {
   pageSize: number;
   currentPage: number;
   totalSize: number;
   orderItems: OrderItem[];
   id:number = 0;

  constructor(private orderItemService:OrderItemService) { 
    this.orderItems = [];
    this.pageSize = 5;
    this.currentPage = 1;
    this.totalSize = 1;
  }

  ngOnInit(): void {

      this.refresh();
   }

   changeStatus(event:Event, status:string): void{
    let orderItemId: number = Number((event.target as Element).id);
    this.orderItemService.changeStatusOrderItem(orderItemId, status).subscribe(res=>{
      this.refresh();
    });
    
   }

   changePage(newPage: number) {
    this.orderItemService.getOrderItemsById(newPage - 1, this.pageSize, this.id)
    .subscribe((res) => {
      this.orderItems = res.body as OrderItem[];
      this.totalSize = Number(res.headers.get("Total-items"));
    });
  }

   refresh() : void{
    this.id = Number(localStorage.getItem("id"));
    this.orderItemService
      .getOrderItemsById(this.currentPage - 1, this.pageSize,  this.id)
      .subscribe((res) => {
        this.orderItems = res.body as OrderItem[];
        this.totalSize = Number(res.headers.get("Total-items"));
      });

   }


}




    
