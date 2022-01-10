import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from './services/auth/auth.service';
import { PasswordResetHomeService } from './services/password-reset-home/password-reset-home.service';
import { PasswordResetHomeComponent } from './pages/password-reset-home/password-reset-home.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';


@NgModule({
  declarations: [
    LoginComponent,
    PasswordResetHomeComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    PasswordResetHomeService
  ]
})
export class AuthModule { }
