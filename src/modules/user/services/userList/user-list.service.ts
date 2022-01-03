import { Injectable } from '@angular/core';
import { HttpHeaders,HttpResponse, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegisterUser,User } from 'src/modules/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  private readonly REGISTER_PATH : string = "api/v1/"
  constructor(private http: HttpClient) { }

  register(userType:string):Observable<User[]>{
    return this.http.get<User[]>(this.REGISTER_PATH+userType, {
      headers: this.headers,
      responseType: "json",
    });
  }

  delete(id:number,userType: string): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(this.REGISTER_PATH+userType+'/'+id, {
      headers: this.headers,
      responseType: "json",
    });
  }
}
