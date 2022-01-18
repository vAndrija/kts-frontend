import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderItemsTableComponent } from './pages/order-items-table/order-items-table.component';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './pages/order/order.component';
import { OrderItemCardComponent } from './components/order-item-card/order-item-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { OrderTableComponent } from './pages/order-table/order-table.component';
import { OrderReviewComponent } from './pages/order-review/order-review.component';

@NgModule({
  declarations: [
    OrderItemsTableComponent,
    OrderComponent,
    OrderItemCardComponent,
    CreateOrderComponent,
    OrderTableComponent,
    OrderReviewComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderModule { }
