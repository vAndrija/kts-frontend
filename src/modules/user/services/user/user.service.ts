import { Injectable } from '@angular/core';
import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ChangePasswordModel } from 'src/modules/shared/models/login';
import { RestService } from 'src/modules/shared/services/rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends RestService {
  private readonly CHANGE_PASSWORD: string  = "api/v1/auth/change-password"

  changePassword(data:ChangePasswordModel): Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>(this.CHANGE_PASSWORD,data,{
      headers: this.headers,
      responseType: "json",
    })
  }
}
