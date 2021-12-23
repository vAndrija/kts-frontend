import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RootLayoutComponent } from './pages/root-layout/root-layout.component';

const routes: Routes = [
  {
    path: "restaurant",
    component: RootLayoutComponent,
    children: [
      // {
      //   path: "auth",
      //   loadChildren: () =>
      //     import("./../auth/auth.module").then((m) => m.AuthModule),
      // },
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
    path: "users",
    children: [
      {
        path:"",
        loadChildren: () =>
          import("./../user/user.module").then((m)=> m.UserModule)
      }
    ]
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
