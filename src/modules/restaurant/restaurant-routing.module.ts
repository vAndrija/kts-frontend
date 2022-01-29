import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { RestaurantPreviewComponent } from './pages/restaurant-preview/restaurant-preview.component';

const routes: Routes = [
  {
    path: 'preview',
    pathMatch: 'full',
    component: RestaurantPreviewComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_MANAGER|ROLE_COOK|ROLE_BARTENDER|ROLE_WAITER|ROLE_SYSTEM_ADMIN" }
  },
  { path: "**", redirectTo: "preview" }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
