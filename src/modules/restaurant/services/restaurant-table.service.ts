import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantTable } from 'src/modules/shared/models/restaurant-table';
import { RestService } from 'src/modules/shared/services/rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantTableService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getRestaurantTables(): Observable<any> {
    return this.http.get<any>("api/v1/restaurant-table/");
  }

  addRestaurantTable(table: RestaurantTable): Observable<RestaurantTable> {
    return this.http.post<RestaurantTable>("api/v1/restaurant-table", table, {
      headers: this.headers,
      responseType: "json",
    });
  }

  deleteRestaurantTable(tableId: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>("api/v1/restaurant-table/" + tableId, {
      headers: this.headers,
      responseType: 'json'
    })
  }

  findTableWithOrder(tableId: number): Observable<any> {
    return this.http.get<any>("api/v1/orders/by-restaurant-table/" + tableId);
  }
}
