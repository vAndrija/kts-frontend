import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { CreateMenuComponent } from './pages/create-menu/create-menu.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';

import { MenuItemsReviewComponent } from './pages/menu-items-review/menu-items-review.component';
import { MenuItemCardComponent } from './components/menu-item-card/menu-item-card.component';

import { MenuService as MService } from './services/menu.service'; // TODO: ???
import { MenuService } from './services/menu-service/menu.service';
import { MenuItemFormComponent } from './components/menu-item-form/menu-item-form.component';
import { CreateMenuItemComponent } from './pages/create-menu-item/create-menu-item.component';


@NgModule({
  declarations: [
    CreateMenuComponent,
    MenuFormComponent,
    MenuItemsReviewComponent,
    MenuItemCardComponent,
    MenuItemFormComponent,
    CreateMenuItemComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    MenuService,
    MService
  ]
})
export class MenuModule { }
