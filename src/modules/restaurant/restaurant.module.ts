import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantPreviewComponent } from './pages/restaurant-preview/restaurant-preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RestaurantPreviewComponent
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RestaurantModule { }
