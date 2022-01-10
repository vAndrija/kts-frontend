import { Injectable } from '@angular/core';
import { HttpHeaders,HttpResponse, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResetPasswordModel } from 'src/modules/shared/models/login';
import { RestService } from 'src/modules/shared/services/rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetHomeService extends RestService {
  private readonly SEND_RESET_TOKEN_PATH : string = "api/v1/auth/send-reset-password-link"
  private readonly RESET_PASSWORD_PATH: string  = "api/v1/auth/reset-password"

  constructor(http: HttpClient) {
    super(http);
  }

  sendResetToken(data: ResetPasswordModel): Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>(this.SEND_RESET_TOKEN_PATH, data, {
      headers: this.headers,
      responseType: "json",
    });
  }

  finishResetToken(data:ResetPasswordModel): Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>(this.RESET_PASSWORD_PATH, data, {
      headers: this.headers,
      responseType: "json",
    });
  }
}
