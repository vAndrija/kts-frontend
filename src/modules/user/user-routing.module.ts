import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent} from './pages/registration/registration.component'
import { UserListComponent} from "./pages/user-list/user-list.component"
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
