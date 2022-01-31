import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/modules/shared/services/rest/rest.service';
import { Reservation } from '../../model/reservation';
import { ReservationDto } from '../../model/reservation-dto';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends RestService{

  constructor(http: HttpClient) {
    super(http);
  }

  getTableReservations(page: number, size: number): Observable<any> {
    let queryParams = {};

    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(size)),
    };

    return this.http.get<any>("api/v1/table-reservations", queryParams);
  }

  addTableReservation(reservation: ReservationDto): Observable<Reservation> {
    return this.http.post<Reservation>("api/v1/table-reservations", reservation, {
      headers: this.headers, 
      responseType: 'json'
    });
  }

  deleteReservation(reservationId: number): Observable<any> {
    return this.http.delete<any>("api/v1/table-reservations/" + reservationId.toString(), {
      headers: this.headers,
      responseType: 'json'
    })
  }

  editTableReservation(reservation: ReservationDto, id: number ): Observable<Reservation> {
    return this.http.put<Reservation>("api/v1/table-reservations/" + id.toString(), reservation, {
      headers: this.headers,
      responseType: 'json'
    })
  }
}
