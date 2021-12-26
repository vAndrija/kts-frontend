import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RootLayoutComponent } from './pages/root-layout/root-layout.component';

const routes: Routes = [
  {
    path: "",
    component: RootLayoutComponent,
    children: [
      {
        path: "order",
        loadChildren: () =>
          import("./../order/order.module").then((m) => m.OrderModule),
      },
      {
        path: "menu",
        loadChildren: () =>
          import("./../menu/menu.module").then((m) => m.MenuModule),
      },

      {
        path: "users",
        loadChildren: () =>
          import("./../user/user.module").then((m) => m.UserModule)
      }
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
  {
    path: "",
    redirectTo: "/restaurant",
    pathMatch: "full",
  },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
