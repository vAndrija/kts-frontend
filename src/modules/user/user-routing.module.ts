import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent} from './pages/registration/registration.component'
import { UserListComponent} from "./pages/user-list/user-list.component"
import { UserUpdateComponent } from './pages/user-update/user-update.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { RoleGuard } from "../auth/guards/role/role.guard";

const routes: Routes = [
  {
    path: "registration",
    pathMatch: "full",
    component: RegistrationComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_SYSTEM_ADMIN" },
  },
  {
    path: "users",
    pathMatch: "full",
    component: UserListComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_SYSTEM_ADMIN|ROLE_MANAGER" },
  },
  {
    path: "change-password",
    pathMatch: "full",
    component: ChangePasswordComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_SYSTEM_ADMIN|ROLE_BARTENDER|ROLE_COOK|ROLE_MANAGER|ROLE_WAITER"},
  },
  {
    path: "user-update",
    pathMatch: "full",
    component: UserUpdateComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ROLE_SYSTEM_ADMIN|ROLE_BARTENDER|ROLE_COOK|ROLE_MANAGER|ROLE_WAITER"},
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
