import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RootLayoutComponent } from './pages/root-layout/root-layout.component';
import { RoleGuard} from 'src/modules/auth/guards/role/role.guard'
const routes: Routes = [
  {
    path: "",
    component: RootLayoutComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_SYSTEM_ADMIN|ROLE_BARTENDER|ROLE_COOK|ROLE_MANAGER|ROLE_WAITER"},
    children: [
      {
        path: "order",
        loadChildren: () =>
          import("./../order/order.module").then((m) => m.OrderModule),
      },
      {
        path: "reservation",
        loadChildren: () =>
          import("./../reservation/reservation.module").then((m) => m.ReservationModule)
      },
      {
        path: "menu",
        loadChildren: () =>
          import("./../menu/menu.module").then((m) => m.MenuModule),
      },
      {
        path: "",
        loadChildren: () =>
          import("./../user/user.module").then((m) => m.UserModule)
      },
      {
        path: "report",
        loadChildren: () => 
          import("./../report/report.module").then((m) => m.ReportModule)
      },
      {
        path: "restaurant",
        loadChildren: () =>
          import("./../restaurant/restaurant.module").then((m) => m.RestaurantModule),
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./../auth/auth.module").then((m) => m.AuthModule),
      },
    ],
  },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
