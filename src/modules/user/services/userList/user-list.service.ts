import { Injectable } from '@angular/core';
import { HttpHeaders,HttpResponse, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User} from 'src/modules/shared/models/user';
import { Salary } from 'src/modules/shared/models/salary';
import { RestService } from 'src/modules/shared/services/rest/rest.service';

@Injectable({
  providedIn: 'root'
})

export class UserListService extends RestService {
  private readonly BASE : string = "api/v1/"
  private readonly CREATE_SALARY : string = "api/v1/salaries"
  
  constructor(http: HttpClient) {
    super(http);
  }

  getUsers(userType:string):Observable<User[]>{
    return this.http.get<User[]>(this.BASE+userType, {
      headers: this.headers,
      responseType: "json",
    });
  }

  delete(id:number,userType: string): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(this.BASE+userType+'/'+id, {
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

  updateSalary(data:Salary): Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>(this.CREATE_SALARY,data,{
      headers: this.headers,
      responseType: "json",
      
    })
  }
  updatePriority(id: number,userType: string): Observable<HttpResponse<any>>{
    return this.http.put<HttpResponse<any>>(this.BASE+userType+"/updatePriority/"+id,{},{
      headers: this.headers,
      responseType: "json",
    })
  }
}
