import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Token } from "src/modules/shared/models/token";
import { RestService } from 'src/modules/shared/services/rest/rest.service';
import { Login } from '../../model/login';
import { PreparationStaff } from 'src/modules/user/model/preparation-staff';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  login(auth: Login): Observable<Token> {
    return this.http.post<Token>("api/v1/auth/login", auth, {
      headers: this.headers,
      responseType: "json",
    });
  }

  isLoggedIn(): boolean {
    if (!localStorage.getItem("user")) {
      return false;
    }
    return true;
  }

  isUserOnMainPosition(): boolean {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("id");

    if (role === "ROLE_BARTENDER") {
      this.getUser("api/v1/bartender/" + userId).subscribe(
        (result) => {
          return result.priority;
        }
      )
    }
    if (role === "ROLE_COOK") {
      this.getUser("api/v1/cook/" + userId).subscribe(
        (result) => {
          return result.priority;
        }
      )
    }
    
    return false;
  }

  getUser(path: string): Observable<PreparationStaff> {
    return this.http.get<PreparationStaff>(path, {
      headers: this.headers,
      responseType: "json"
    })
  }

  logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
  }
}
