
import { MenuItemDto } from 'src/modules/menu/model/menu-item-dto';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/modules/shared/services/rest/rest.service';
import { MenuItem } from '../../model/menu-item';
import { UpdateMenuItemDto } from '../../model/update-menu-item-dto';


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

  getMenuItemsByMenu(menuId: string, page: number, pageSize: number): Observable<HttpResponse<any>> {
    let queryParams = {};
    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(pageSize)),
    };

    return this.http.get<HttpResponse<MenuItem[]>>("api/v1/menu-items/by-menu/" + menuId, queryParams);
  }

  getAllMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>("api/v1/menu-items", {
          headers: this.headers,
          responseType: 'json'
    });
  }

  getMenuItemsByMenuAndSearchFilterParams(menuId: string, searchParam: string, filter: string, page: number, pageSize: number): Observable<HttpResponse<any>> {
    let queryParams = {};
    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(pageSize))
        .append("searchParam", String(searchParam))
        .append("filter", String(filter)),
    };

    return this.http.get<HttpResponse<MenuItem[]>>("api/v1/menu-items/by-menu/" + menuId + "/search", queryParams);
  }

  getMenuItemsByCategory(page: number, pageSize: number, category: string): Observable<HttpResponse<any>> {
    let queryParams = {};
    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(pageSize)),
    };

    return this.http.get<HttpResponse<MenuItem[]>>("api/v1/menu-items/filter/pageable/"+ category, queryParams);
  }

  getAllMenuItemsPageable(page: number, pageSize: number): Observable<any> {
    let queryParams = {};
    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(pageSize)),
    };
    return this.http.get<MenuItem[]>("api/v1/menu-items/pageable", queryParams);
  }


  searchMenuItems(search: string): Observable<HttpResponse<any>> {
    let queryParams = {};
    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("search",search)
    };
    return this.http.get<HttpResponse<MenuItem[]>>("api/v1/menu-items/search/", queryParams);
    
  }

  getAllMenuItemsInActiveMenu(page: number, pageSize: number): Observable<any> {
    let queryParams = {};
    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(pageSize)),
    };
    return this.http.get<MenuItem[]>("api/v1/menu-items/by-active-menu", queryParams);
  }
}
