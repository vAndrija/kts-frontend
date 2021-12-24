import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { OrderItemsTableComponent } from './pages/order-items-table/order-items-table.component';

const routes: Routes = [
  {
    path:'order-items',
    pathMatch:'full',
    component: OrderItemsTableComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_BARTENDER|ROLE_COOK|ROLE_WAITER" },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
