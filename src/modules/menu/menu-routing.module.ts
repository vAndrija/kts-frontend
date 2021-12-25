import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { MenuItemsReviewComponent } from './pages/menu-items-review/menu-items-review.component';

const routes: Routes = [
  {
    path: "menu-items",
    pathMatch: "full",
    component: MenuItemsReviewComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: "ROLE_MANAGER|ROLE_COOK|ROLE_BARTENDER|ROLE_WAITER|ROLE_SYSTEM_ADMIN"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
