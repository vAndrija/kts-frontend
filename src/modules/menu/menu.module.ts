import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuItemsReviewComponent } from './pages/menu-items-review/menu-items-review.component';
import { MenuItemCardComponent } from './components/menu-item-card/menu-item-card.component';
import { MenuService } from './services/menu-service/menu.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuItemDetailsComponent } from './pages/menu-item-details/menu-item-details.component';
import { MenuItemService } from './services/menu-item-service/menu-item.service';


@NgModule({
  declarations: [
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
  providers: [MenuService, MenuItemService]
})
export class MenuModule { }
