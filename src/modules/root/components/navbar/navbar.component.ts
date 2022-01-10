import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/modules/auth/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public role: String = '';
  public reportMenuVisibility: boolean = false;
  public show: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.checkRole();
    this.show = this.checkForPreparationStaff();
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

  checkForPreparationStaff(): boolean {
    return this.auth.isUserOnMainPosition();
  }
}
