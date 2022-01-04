
import { MenuItemDto } from 'src/modules/menu/model/MenuItemDto';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/modules/shared/services/rest/rest.service';
import { MenuItem } from '../../model/menuItem';
import { UpdateMenuItemDto } from '../../model/updateMenuItemDto';
import { MenuService } from '../menu-service/menu.service';


@Injectable({
  providedIn: 'root'
})
export class MenuItemService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  addMenuItem(menuItem: MenuItemDto): Observable<MenuItemDto> {
    return this.http.post<MenuItemDto>("api/v1/menu-items", menuItem, {
      headers: this.headers,
      responseType: "json",
    });
  }

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

  deleteMenuItem(menuItemId: string): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>("api/v1/menu-items/" + menuItemId, {
          headers: this.headers,
          responseType: 'json'
        })
  }
}