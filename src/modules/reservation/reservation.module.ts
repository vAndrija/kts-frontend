import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationTableComponent } from './components/reservation-table/reservation-table.component';
import { ReservationService } from './service/reservation-service/reservation.service';
import { ReservationPreviewComponent } from './pages/reservation-preview/reservation-preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationRoutingModule } from './reservation-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ReservationTableComponent,
    ReservationPreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ReservationRoutingModule
  ],
  providers: [ReservationService]
})
export class ReservationModule { }
