import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuItemsReviewComponent } from './pages/menu-items-review/menu-items-review.component';
import { MenuItemCardComponent } from './components/menu-item-card/menu-item-card.component';
import { MenuService } from './services/menu-service/menu.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MenuItemsReviewComponent,
    MenuItemCardComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule
  ],
  providers: [MenuService]
})
export class MenuModule { }
