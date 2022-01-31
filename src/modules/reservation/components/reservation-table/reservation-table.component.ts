import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { RestaurantTable } from 'src/modules/restaurant/model/restaurant-table';
import { RestaurantTableService } from 'src/modules/restaurant/services/restaurant-table.service';
import { periodValidator } from 'src/modules/shared/custom-validators/period-validator';
import { Pagination } from 'src/modules/shared/models/pagination';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { Reservation } from '../../model/reservation';
import { ReservationDto } from '../../model/reservation-dto';
import { ReservationService } from '../../service/reservation-service/reservation.service';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss']
})
export class ReservationTableComponent implements OnInit {

  form: FormGroup;
  isEdit: boolean = false;
  reservationId: number = -1;
  pagination: Pagination = new Pagination();
  tables: RestaurantTable[] = [];
  reservations: Reservation[] = [];
  reservation: ReservationDto = {
    tableId: -1,
    name: "",
    durationStart: "",
    durationEnd: ""
  };

  constructor(
    private reservationService: ReservationService,
    private notificationService: NotificationService,
    private tablesService: RestaurantTableService,
    private formBuilder: FormBuilder) {
    this.form = new FormGroup({
      tableId: new FormControl(1, Validators.required),
      name: new FormControl("", Validators.required),
      reservationDate: new FormControl("", Validators.required),
      reservationStart: new FormControl("", Validators.required),
      reservationEnd: new FormControl("", Validators.required),
    }, 
    {
      validators: periodValidator()
    })
   }

  ngOnInit(): void {
    this.loadAllReservations(this.pagination.currentPage - 1);
    this.loadTables();
  }

  loadAllReservations(page: number): void {
    this.reservationService.getTableReservations(page, this.pagination.pageSize).subscribe(
      (result) => {
        this.reservations = result.body["content"] as Reservation[];
        this.pagination.totalPages = result.body["totalPages"] as number;
      });
  }

  loadTables(): void {
    this.tablesService.getRestaurantTables().subscribe(
      (result) => {
        this.tables = result as RestaurantTable[];
      }
    );
  }
   
  onSubmit(): void {
    const tableId = this.form.controls['tableId'].value;
    const name = this.form.controls['name'].value;
    const durationStart = this.form.controls['reservationStart'].value;
    const durationEnd = this.form.controls['reservationEnd'].value;
    const reservationDate = this.form.controls['reservationDate'].value;

    const reservation: ReservationDto = 
    {
      name: name,
      durationStart: reservationDate + 'T' + durationStart,
      durationEnd: reservationDate + 'T' + durationEnd,
      tableId: tableId
    }

    if(!this.isEdit) {
      this.reservationService.addTableReservation(reservation).subscribe(
        (result) => {
          this.notificationService.success("Rezervacija na ime "+ result.name + " je izvšena za sto " + result.tableId);
          this.reservations.push(result);
        },
        (error) => {
          if(error.status === 400) {
            this.notificationService.error("Ne možete da rezervišete u ovom terminu, rezervacija za željeni sto već postoji.")
          }
        }
      );
    }
    else {
      this.reservationService.editTableReservation(reservation, this.reservationId ).subscribe(
        (result) => {
          this.notificationService.success("Rezervacija na ime "+ result.name + " je izmenjena.");
          this.loadAllReservations(this.pagination.currentPage - 1);
        },
        (error) => {
          if(error.status === 400) {
            this.notificationService.error("Ne možete da rezervišete u ovom terminu, rezervacija za željeni sto već postoji.")
          }
        }
      );
    }
    
  }

  resetForm(): void {
    this.isEdit = false;
    this.form.reset();
  }

  edit(reservation: Reservation): void {
    const formatNumber = (value: string): string => `${value.toString().length === 1 ? 0 : ''}${value}`;
    this.isEdit = true;
    this.reservationId = reservation.id;
    
    const durationStart = reservation.durationStart;
    const durationEnd = reservation.durationEnd;
    const reservationDate = durationStart[0] + "-" + formatNumber(durationStart[1]) + "-" + formatNumber(durationStart[2]);
    const reservationStart = formatNumber(durationStart[3]) + ":" + formatNumber(durationStart[4]);
    const reservationEnd = formatNumber(durationEnd[3]) + ":" + formatNumber(durationEnd[4]);

    this.form.patchValue({
      name: reservation.name,
      tableId: reservation.tableId,
      reservationDate: reservationDate,
      reservationStart: reservationStart,
      reservationEnd: reservationEnd
    })
  }

  delete(reservation: Reservation): void {
    this.reservationService.deleteReservation(reservation.id).subscribe(
      () => {
        this.notificationService.success("Rezervacija pod nazivom " + reservation.name + " je otkazana.");
        this.loadAllReservations(this.pagination.currentPage - 1);
      },
      (error) => {
        if(error.status === 400) {
          this.notificationService.error("Došlo je to greške.")
        }
      }
    )
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error) && this.form.get(control)?.touched;
  }

  get currentDate(): string {
    return moment().format("yyyy-MM-DD");
  }
}
