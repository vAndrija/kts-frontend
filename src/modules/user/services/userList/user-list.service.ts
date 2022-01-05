import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegisterUser,User } from 'src/modules/shared/models/user';
import { RestService } from 'src/modules/shared/services/rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserListService extends RestService {
  private readonly REGISTER_PATH : string = "api/v1/"
  constructor(http: HttpClient) {
    super(http);
  }

  register(userType:string): Observable<User[]> {
    return this.http.get<User[]>(this.REGISTER_PATH+userType, {
      headers: this.headers,
      responseType: "json",
    });
  }

  getCooks(): Observable<User[]> {
    return this.http.get<User[]>("api/v1/cook", {
      headers: this.headers,
      responseType: "json",
    })
  }

  getBartenders(): Observable<User[]> {
    return this.http.get<User[]>("api/v1/bartender", {
      headers: this.headers,
      responseType: "json",
    })
  }
}
