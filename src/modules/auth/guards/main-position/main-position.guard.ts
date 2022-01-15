import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainPositionGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate() : boolean {
    if(this.auth.isUserOnMainPosition())
      return true;

    return false;
  }
  
}
