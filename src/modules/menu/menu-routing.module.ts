import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMenuComponent } from './pages/create-menu/create-menu.component';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { MenuItemDetailsComponent } from './pages/menu-item-details/menu-item-details.component';
import { MenuItemsReviewComponent } from './pages/menu-items-review/menu-items-review.component';
import { CreateMenuItemComponent } from './pages/create-menu-item/create-menu-item.component';
import { PendingMenuItemsComponent } from './pages/pending-menu-items/pending-menu-items.component';

const routes: Routes = [
  {
    path: "create-menu",
    pathMatch: "full",
    component: CreateMenuComponent,
  },
  {
    path: "pending-menu-items",
    pathMatch: "full",
    component: PendingMenuItemsComponent
  },
  {
    path: "menu-items",
    pathMatch: "full",
    component: MenuItemsReviewComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: "ROLE_MANAGER|ROLE_COOK|ROLE_BARTENDER|ROLE_WAITER|ROLE_SYSTEM_ADMIN"}
  },
  {
    path: "create-menu-item",
    pathMatch: "full",
    component: CreateMenuItemComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: "ROLE_COOK|ROLE_BARTENDER"}
  },
  {
    path: "menu-items/:menuItemId",
    pathMatch: "full",
    component: MenuItemDetailsComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: "ROLE_MANAGER|ROLE_COOK|ROLE_BARTENDER|ROLE_WAITER|ROLE_SYSTEM_ADMIN"}
  },
  //ili dodati da se prikaze 404 ali bice prikazan i side bar
  { path: "**", redirectTo: "/menu/menu-items" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MenuRoutingModule { }
