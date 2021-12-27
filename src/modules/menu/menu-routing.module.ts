import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMenuComponent } from './pages/create-menu/create-menu.component';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { MenuItemsReviewComponent } from './pages/menu-items-review/menu-items-review.component';

const routes: Routes = [
  {
    path: "create-menu",
    pathMatch: "full",
    component: CreateMenuComponent,
  },
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
