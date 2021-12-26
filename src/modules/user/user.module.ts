import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RegistrationService } from "./services/registration/registration.service";
import { UserListService } from "./services/userList/user-list.service"
import { UserListComponent } from './pages/user-list/user-list.component'

@NgModule({
  declarations: [
    RegistrationComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    RegistrationService,
    UserListService
  ]
})
export class UserModule { }
