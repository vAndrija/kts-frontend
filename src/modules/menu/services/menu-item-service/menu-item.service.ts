import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../../model/menuItem';
import { UpdateMenuItemDto } from '../../model/updateMenuItemDto';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  getMenuItem(menuItemId: string): Observable<MenuItem> {
    return this.http.get<MenuItem>("api/v1/menu-items/" + menuItemId, {
      headers: this.headers,
      responseType: 'json'
    });
  }

  updateMenuItem(menuItem: UpdateMenuItemDto, menuItemId: string): Observable<MenuItem> {
    return this.http.put<MenuItem>("api/v1/menu-items/" + menuItemId, menuItem, {
      headers: this.headers,
      responseType: 'json'
    })
  }
}
