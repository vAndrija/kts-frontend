import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from 'src/modules/shared/models/order';
import { RestService } from 'src/modules/shared/services/rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getOrdersByWaiter(page: number, size: number, id: number): Observable<any> {
    let queryParams = {};

    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(size)),
    };

    return this.http.get<any>("api/v1/orders/by-waiter/" + id, queryParams);
  }

  changeStatusOrder(id: number, status: string): Observable<OrderDto> {

    return this.http.post<any>("api/v1/orders/status/" + id, status);
  };

  filterStatus(page: number, size: number, id: number, status: string): Observable<any> {
    let queryParams = {};

    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(size)),
    };

    return this.http.get<any>("api/v1/orders/filter/" + id + "/" + status, queryParams);
  };
}
