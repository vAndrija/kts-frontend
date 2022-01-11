import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NotificationService } from './services/notification/notification.service';
import { CustomDateTimePipe } from './pipes/custom-date-time.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [
    CustomDateTimePipe,
    PaginationComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatTableModule
  ],
  exports:[
    CustomDateTimePipe,
    PaginationComponent,
     TableComponent
  ],
  providers: [NotificationService]
})
export class SharedModule { }
