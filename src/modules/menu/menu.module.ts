import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { CreateMenuComponent } from './pages/create-menu/create-menu.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';

import { MenuItemsReviewComponent } from './pages/menu-items-review/menu-items-review.component';
import { MenuItemCardComponent } from './components/menu-item-card/menu-item-card.component';

import { MenuService } from './services/menu-service/menu.service';
import { PendingMenuItemsComponent } from './pages/pending-menu-items/pending-menu-items.component';


@NgModule({
  declarations: [
    CreateMenuComponent,
    MenuFormComponent,
    MenuItemsReviewComponent,
    MenuItemCardComponent,
    PendingMenuItemsComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    MenuService,
  ]
})
export class MenuModule { }
