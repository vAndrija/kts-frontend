import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PriceItem } from '../../model/priceItem';

@Injectable({
  providedIn: 'root'
})
export class PriceItemService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  createPriceItem(priceItem: PriceItem) {
    console.log(priceItem)
    return this.http.post<PriceItem>("api/v1/price-items", priceItem, {
      headers: this.headers,
      responseType: 'json'
    });
  }
}
