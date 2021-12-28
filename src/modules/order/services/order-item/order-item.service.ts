import { Injectable } from '@angular/core';
import {
  HttpClient, HttpParams, HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { OrderItem } from 'src/modules/shared/models/orderitem';
@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  constructor(private http: HttpClient) { }

  getOrderItemsById(page:number, size:number, id: number): Observable<HttpResponse<OrderItem[]>> {
    // return this.http.get<HttpResponse<OrderItem[]>>("api/v1/order-items/employee/" + id, 
    // {
    //   params: {
    //     appid: 'id1234',
    //     cnt: '5'
    //   },
    //   observe: 'response'
    // }));
    let queryParams = {};

    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(size)),
    };

    return this.http.get<HttpResponse<OrderItem[]>>("api/v1/order-items/employee/" + id, queryParams);
  }
  

  changeStatusOrderItem(id: number, status: string): Observable<OrderItem> {
    return this.http.post<any>("api/v1/order-items/status/" + id, status);
  };
}
