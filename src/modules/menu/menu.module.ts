import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMenuComponent } from './pages/create-menu/create-menu.component';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { MenuService } from './services/menu.service';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    CreateMenuComponent,
    MenuFormComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    MenuService
  ]
})
export class MenuModule { }
