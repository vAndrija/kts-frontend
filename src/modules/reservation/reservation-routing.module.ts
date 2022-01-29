import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { ReservationPreviewComponent } from './pages/reservation-preview/reservation-preview.component';


const routes: Routes = [
  {
    path: "reservation-table",
    pathMatch: "full",
    component: ReservationPreviewComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: "ROLE_WAITER"}
  },
  { path: "**", redirectTo: "/menu/menu-items" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReservationRoutingModule { }