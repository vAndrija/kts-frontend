import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NotificationService } from './services/notification/notification.service';
import { CustomDateTimePipe } from './pipes/custom-date-time.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';


@NgModule({
  declarations: [
    CustomDateTimePipe,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    CustomDateTimePipe,
    PaginationComponent
  ],
  providers: [NotificationService]
})
export class SharedModule { }
