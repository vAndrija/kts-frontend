import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { CreateMenuComponent } from './pages/create-menu/create-menu.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';

import { MenuItemsReviewComponent } from './pages/menu-items-review/menu-items-review.component';
import { MenuItemCardComponent } from './components/menu-item-card/menu-item-card.component';
import { MenuService } from './services/menu-service/menu.service';
import { MenuItemFormComponent } from './components/menu-item-form/menu-item-form.component';
import { CreateMenuItemComponent } from './pages/create-menu-item/create-menu-item.component';
import { MenuItemDetailsComponent } from './components/menu-item-details/menu-item-details.component';
import { MenuItemService } from './services/menu-item-service/menu-item.service';
import { PriceItemService } from './services/price-item-service/price-item.service';
import { PendingMenuItemsComponent } from './pages/pending-menu-items/pending-menu-items.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../shared/shared.module';
import { UpdateMenuItemComponent } from './components/update-menu-item/update-menu-item.component';
import { MenuItemReviewComponent } from './pages/menu-item-review/menu-item-review.component';
import { MenuTableComponent } from './components/menu-table/menu-table.component';
import { MenuTableReviewComponent } from './pages/menu-table-review/menu-table-review.component';


@NgModule({
  declarations: [
    CreateMenuComponent,
    MenuFormComponent,
    MenuItemsReviewComponent,
    MenuItemCardComponent,
    MenuItemFormComponent,
    CreateMenuItemComponent,
    MenuItemDetailsComponent,
    PendingMenuItemsComponent,
    UpdateMenuItemComponent,
    MenuItemReviewComponent,
    MenuTableComponent,
    MenuTableReviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ],
  providers: [MenuService, MenuItemService, PriceItemService]
})
export class MenuModule { }
