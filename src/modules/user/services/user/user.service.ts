import { Injectable } from '@angular/core';
import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ChangePasswordModel } from 'src/modules/shared/models/login';
import { RestService } from 'src/modules/shared/services/rest/rest.service';
import { User,RegisterUser } from 'src/modules/shared/models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService extends RestService {
  private readonly CHANGE_PASSWORD: string  = "api/v1/auth/change-password";
  private readonly CURRENT_USER_PATH: string = "api/v1/auth/current-user";
  private readonly BASE_PATH: string  = "api/v1/"

  changePassword(data:ChangePasswordModel): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.CHANGE_PASSWORD, data, {
      headers: this.headers,
      responseType: "json",
    })
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.CURRENT_USER_PATH, {
      headers: this.headers,
      responseType: "json",
    });
  }

  updateUser(id: number, userType: string, data: RegisterUser): Observable<User> {
    return this.http.put<User>(this.BASE_PATH+`${userType}/${id}`, data, {
      headers: this.headers,
      responseType: "json",
    })
  }
}
