import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RegistrationService } from "./services/registration.service"

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    RegistrationService
  ]
})
export class UserModule { }
