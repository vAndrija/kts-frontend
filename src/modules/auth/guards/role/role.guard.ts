import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
      const expectedRoles: string = route.data['expectedRoles'];
      const token = localStorage.getItem("user");
      const jwt: JwtHelperService = new JwtHelperService();
      if (!token) {
        this.router.navigate(["/auth/login"]);
        return false;
      }

      const info = jwt.decodeToken(token);
<<<<<<< HEAD
      const roles: string[] = expectedRoles.split("|")
      // if (roles.indexOf(info.role[0].authority) === -1) {
      //   this.router.navigate(["/restaurant"]);
      //   return false;
      // }
=======
      if(info.exp<Date.now()/1000){
        localStorage.removeItem("role")
        localStorage.removeItem("user")
        this.router.navigate(["/auth/login"]);
        return false;
      }
      
      const roles: string[] = expectedRoles.split("|", 5);
      if (roles.indexOf(info.role) === -1) {
        this.router.navigate(["/"]);
        return false;
      }
>>>>>>> 4f34b58e9550c155b857d248f6fb13cf0b3231ee
      return true;
  }

}
