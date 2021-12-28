import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderItemsTableComponent } from './pages/order-items-table/order-items-table.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OrderItemsTableComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
