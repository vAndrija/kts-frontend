import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegisterUser,User } from 'src/modules/shared/models/user';
import { RestService } from 'src/modules/shared/services/rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends RestService {
  private readonly REGISTER_PATH : string = "api/v1/"
  constructor(http: HttpClient) {
    super(http);
  }

  register(data: RegisterUser,userType:string): Observable<User> {
    return this.http.post<User>(this.REGISTER_PATH+userType, data, {
      headers: this.headers,
      responseType: "json",
    });
  }
}
