import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/modules/auth/services/auth/auth.service';
import { Notification } from 'src/modules/shared/models/notification';
import { MessageService } from 'src/modules/shared/services/messages/message.service';
import { WebsocketService } from 'src/modules/shared/services/websocket/websocket.service';
import { UserService } from 'src/modules/user/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public role: string = '';
  public reportMenuVisibility: boolean = false;
  public show: boolean = false;
  messages: Notification[] = []
  pulse: boolean = false;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router,
    private socketService: WebsocketService) {
      this.socketService.pulseDiv.subscribe(
        () => {
          this.pulse = true;
        }
      )
     }

  ngOnInit(): void {
    this.checkRole();
    this.checkForPreparationStaff();
    
  }

  loadNotifications(): void {
    this.pulse = false;
    const userId = localStorage.getItem("id");
    if (localStorage.getItem('role') === "ROLE_WAITER") {
      this.messageService.getWaiterNotification(userId).subscribe(
        (result) => {
          this.messages = result as Notification[];
        }
      )
    }
    else if (localStorage.getItem('role') === "ROLE_BARTENDER" || localStorage.getItem('role') === "ROLE_COOK") {
      this.messageService.getCookAndBartemderNotification().subscribe(
        (result) => {
          this.messages = result as Notification[];
        }
      )
    }
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

  profile() {
    this.router.navigate(["/user-update"]);
  }

  changePassword() {
    this.router.navigate(["/change-password"]);
  }
}
