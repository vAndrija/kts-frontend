import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItemDto } from 'src/modules/menu/model/MenuItemDto';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {

  }

  addMenuItem(menuItem: MenuItemDto): Observable<MenuItemDto> {
    return this.http.post<MenuItemDto>("api/v1/menu-items", menuItem, {
      headers: this.headers,
      responseType: "json",
    });
  }
}
