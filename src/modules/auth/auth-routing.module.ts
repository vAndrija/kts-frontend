import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login/login.guard';
import { LoginComponent } from './pages/login/login.component';
import { PasswordResetHomeComponent } from './pages/password-reset-home/password-reset-home.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { TestPictureUploadComponent } from './pages/test-picture-upload/test-picture-upload.component';
const routes: Routes = [
  {
    path: "login",
    pathMatch: "full",
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "password-reset-start",
    pathMatch: "full",
    component: PasswordResetHomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "password-reset/:token",
    pathMatch: "full",
    component: PasswordResetComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "test",
    pathMatch: "full",
    component: TestPictureUploadComponent,
  },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
