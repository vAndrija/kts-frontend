import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/modules/shared/services/rest/rest.service';
import { Menu } from '../../model/menu';
import { MenuDto} from '../../model/menu-dto'
import { MenuItem } from '../../model/menu-item';

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

  getMenu(id: number): Observable<MenuDto> {
    return this.http.get<MenuDto>("api/v1/menu/" + id.toString(), {
      headers: this.headers,
      responseType: "json"
    });
  }

  getPendingMenuItems(page: number, pageSize: number): Observable<HttpResponse<any>> {
    let queryParams = {};
    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(pageSize)),
    };

    return this.http.get<HttpResponse<MenuItem[]>>("api/v1/menu-items/pending-menu-items", queryParams);
   
  }

  updateMenu(menu: MenuDto, id: number): Observable<MenuDto> {
    return this.http.put<MenuDto>("api/v1/menu/" + id.toString(), menu, {
      headers: this.headers,
      responseType: "json"
    });
  }
  
  getActiveMenus(date: string): Observable<HttpResponse<any>> {
    let queryParams = {};
    queryParams = {
      observe: "response",
      params: new HttpParams()
        .set("date", date)
    };
    return this.http.get<HttpResponse<MenuItem[]>>("api/v1/menu/active", queryParams);
  }

  addMenu(menu: MenuDto): Observable<MenuDto> {
    return this.http.post<MenuDto>("api/v1/menu", menu, {
      headers: this.headers,
      responseType: "json",
    });
  }
}
