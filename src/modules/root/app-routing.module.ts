import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RootLayoutComponent } from './pages/root-layout/root-layout.component';

const routes: Routes = [
  {
    path: "restaurant",
    component: RootLayoutComponent,
    children: [
      {
        path: "order",
        loadChildren: () =>
          import("./../order/order.module").then((m) => m.OrderModule),
      {
        path: "users",
        children: [
          {
            path:"",
            loadChildren: () =>
              import("./../user/user.module").then((m)=> m.UserModule)
          }
        ]
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
  {
    path: "",
    redirectTo: "/auth/login",
    pathMatch: "full",
  },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
