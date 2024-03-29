import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { AcceptOrderItemComponent } from './pages/accept-order-item/accept-order-item.component';
import { OrderItemsTableComponent } from './pages/order-items-table/order-items-table.component';
import { OrderReviewComponent } from './pages/order-review/order-review.component';
import { OrderTableComponent } from './pages/order-table/order-table.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  {
    path: 'order-items',
    pathMatch: 'full',
    component: OrderItemsTableComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_MANAGER|ROLE_COOK|ROLE_BARTENDER|ROLE_WAITER|ROLE_SYSTEM_ADMIN" }
  },
  {
    path: 'unaccepted-order-items',
    pathMatch: 'full',
    component: AcceptOrderItemComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_COOK|ROLE_BARTENDER"}
  },
  {
    path: 'order',
    pathMatch: 'full',
    component: OrderComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_WAITER" }
  },
  {
    path: 'orders',
    pathMatch: 'full',
    component: OrderTableComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_WAITER" }
  },
  {
    path: 'review',
    pathMatch: 'full',
    component: OrderReviewComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_WAITER" }
  },
  { path: "**", redirectTo: "order" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
