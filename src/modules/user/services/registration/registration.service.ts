import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RestService } from 'src/modules/shared/services/rest/rest.service';
import { RegisterUser } from '../../model/register-user';
import { User } from '../../model/user';

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
