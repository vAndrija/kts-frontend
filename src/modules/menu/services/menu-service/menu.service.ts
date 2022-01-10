import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { RestService } from 'src/modules/shared/services/rest/rest.service';
import { Menu } from '../../model/menu';
import { MenuDto} from '../../model/menuDto'
import { MenuItem } from '../../model/menuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>("api/v1/menu", {
      headers: this.headers,
      responseType: 'json'
    });
  }

  getPendingMenuItems(page: Number, pageSize: Number): Observable<HttpResponse<any>> {
    let queryParams = {};
    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(pageSize)),
    };

    return this.http.get<HttpResponse<MenuItem[]>>("api/v1/menu-items/pending-menu-items", queryParams);
   
  }

  addMenu(menu: MenuDto): Observable<MenuDto> {
    return this.http.post<MenuDto>("api/v1/menu", menu, {
      headers: this.headers,
      responseType: "json",
    });
  }
  
  getMenuItemsByCategory(page: Number, pageSize: Number, category:String): Observable<HttpResponse<any>> {
    let queryParams = {};
    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(pageSize)),
    };

    return this.http.get<HttpResponse<MenuItem[]>>("api/v1/menu-items/filter/pageable/"+ category, queryParams);
  }

  getAllMenuItems(page: Number, pageSize: Number): Observable<any> {
    let queryParams = {};
    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(pageSize)),
    };
    return this.http.get<MenuItem[]>("api/v1/menu-items/pageable", queryParams);
  }

  searchMenuItems(search:String): Observable<any> {
    return this.http.get<MenuItem[]>("api/v1/menu-items/search/"+ search);
    
  }

}
