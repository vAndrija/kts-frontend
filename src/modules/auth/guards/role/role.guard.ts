import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string = route.data['expectedRoles'];
    const isPriorityRoute : boolean = route.data['isPriorityRoute']==undefined? false : JSON.parse(route.data['isPriorityRoute'])
    const token = localStorage.getItem("user");
    const currentUserPriority = localStorage.getItem("priority");
    const jwt: JwtHelperService = new JwtHelperService();
    if (!token) {
      this.router.navigate(["/auth/login"]);
      return false;
    }

    const info = jwt.decodeToken(token);
    if (info.exp < Date.now() / 1000) {
      localStorage.removeItem("role")
      localStorage.removeItem("user")
      this.router.navigate(["/auth/login"]);
      return false;
    }

    const roles: string[] = expectedRoles.split("|", 5);
    if (roles.indexOf(info.role) === -1) {
      this.router.navigate(["/menu/menu-items"]);
      return false;
    }
    if(isPriorityRoute && currentUserPriority!=="true") {
      return false;
    }

    return true;
  }

}
