import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../../model/menu';
import { MenuItem } from '../../model/menuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>("api/v1/menu", {
      headers: this.headers,
      responseType: 'json'
    });
  }

  getMenuItems(menuId: string, page: Number, pageSize: Number): Observable<HttpResponse<MenuItem[]>> {
    let queryParams = {};
    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(pageSize)),
    };

    return this.http.get<HttpResponse<MenuItem[]>>("api/v1/menu-items/by-menu/" + menuId, queryParams);
  }
}
