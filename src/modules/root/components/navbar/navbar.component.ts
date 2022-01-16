import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/modules/auth/services/auth/auth.service';
import { User } from 'src/modules/shared/models/user';
import { UserService } from 'src/modules/user/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public role: String = '';
  public reportMenuVisibility: boolean = false;
  public show: boolean = false;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkRole();
    this.checkForPreparationStaff();
  }

  checkRole(): void {
    const role = localStorage.getItem("role");
    if(role) {
      this.role = role;
    }
  }

  changeReportMenuVisibility(): void {
    this.reportMenuVisibility = !this.reportMenuVisibility;
  }

  checkForPreparationStaff(): void {
    
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("id");

    if (role === "ROLE_BARTENDER") {
      this.auth.getUser("api/v1/bartender/" + userId).subscribe(
        (result) => {
          this.show = result.priority;
        }
      )
    }
    if (role === "ROLE_COOK") {
      this.auth.getUser("api/v1/cook/" + userId).subscribe(
        (result) => {
          this.show = result.priority;
        }
      )
    }
    
  }

  
  logout() {
    this.auth.logout();
    this.router.navigate(["/auth/login"]);
  }
}
