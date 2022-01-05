import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public role: String = '';
  public reportMenuVisibility: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.checkRole();
  }

  checkRole(): void {
    const role = localStorage.getItem("role");
    if(role) {
      this.role = role;
    }
  }

  changeReportMenuVisibility(): void {
    this.reportMenuVisibility = !this.reportMenuVisibility;
    console.log(this.reportMenuVisibility)
  }
}
