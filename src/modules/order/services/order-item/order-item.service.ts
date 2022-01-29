import { Injectable } from '@angular/core';
import {
  HttpClient, HttpParams, HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AcceptOrderItem, CreateOrderItem, OrderItem } from 'src/modules/shared/models/orderitem';
import { CreateOrderDto, OrderDto } from 'src/modules/shared/models/order';
import { RestService } from 'src/modules/shared/services/rest/rest.service';
@Injectable({
  providedIn: 'root'
})
export class OrderItemService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getOrderItemsById(page: number, size: number, id: number): Observable<HttpResponse<any>> {
    let queryParams = {};

    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(size)),
    };

    return this.http.get<HttpResponse<any>>("api/v1/order-items/employee/" + id, queryParams);
  }

  getUnacceptedOrderItems(page: number, size: number): Observable<HttpResponse<any>> {
    let queryParams = {};

    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(size)),
    };

    return this.http.get<HttpResponse<any>>("api/v1/order-items/unaccepted", queryParams);
  }


  changeStatusOrderItem(id: number, status: string): Observable<OrderItem> {
    return this.http.post<any>("api/v1/order-items/status/" + id, status);
  }

  createOrder(order: CreateOrderDto): Observable<OrderDto> {
    return this.http.post<any>("api/v1/orders/", order);
  }

  createOrderItem(orderItem: CreateOrderItem): Observable<CreateOrderItem> {
    return this.http.post<any>("api/v1/order-items/", orderItem);

  }

  acceptOrderItem(orderItem: AcceptOrderItem, id: number): Observable<OrderItem> {
    return this.http.put<any>("api/v1/order-items/" + id, orderItem);
  }
  findOrderItemsByOrder(id: number): Observable<OrderItem[]> {
    return this.http.get<any>("api/v1/order-items/order/" + id);
  }

  deleteOrderItem(orderItemId: number): Observable<any> {
    return this.http.delete<HttpResponse<any>>("api/v1/order-items/" + orderItemId, {
      headers: this.headers,
      responseType: 'json'
    })

  }

  filterStatus(page: number, size: number, id: number, status: string): Observable<any> {
    let queryParams = {};

    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(size)),
    };

    return this.http.get<any>("api/v1/order-items/filter/" + id + "/" + status, queryParams);
  }

  filterStatusWaiter(page: number, size: number, id: number, status: string): Observable<any> {
    let queryParams = {};

    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(size)),
    };

    return this.http.get<any>("api/v1/order-items/waiter/" + id + "/" + status, queryParams);
  }
}
