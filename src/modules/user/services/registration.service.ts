import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegisterUser,User } from 'src/modules/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  private readonly REGISTER_PATH : string = "api/v1/"
  constructor(private http: HttpClient) { }

  register(data: RegisterUser,userType:string):Observable<User>{
    return this.http.post<User>(this.REGISTER_PATH+userType, data, {
      headers: this.headers,
      responseType: "json",
    });
  }
}
