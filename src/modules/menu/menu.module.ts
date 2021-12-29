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
import { MenuItemDetailsComponent } from './pages/menu-item-details/menu-item-details.component';
import { MenuItemService } from './services/menu-item-service/menu-item.service';
import { PriceItemService } from './services/price-item-service/price-item.service';


@NgModule({
  declarations: [
    CreateMenuComponent,
    MenuFormComponent,
    MenuItemsReviewComponent,
    MenuItemCardComponent,
    MenuItemDetailsComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MenuService, MenuItemService, PriceItemService]
})
export class MenuModule { }
