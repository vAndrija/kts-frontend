import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/modules/shared/services/rest/rest.service';
import { PriceItem } from '../../model/priceItem';

@Injectable({
  providedIn: 'root'
})
export class PriceItemService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  createPriceItem(priceItem: PriceItem): Observable<PriceItem> {
    return this.http.post<PriceItem>("api/v1/price-items", priceItem, {
      headers: this.headers,
      responseType: 'json'
    });
  }
}
