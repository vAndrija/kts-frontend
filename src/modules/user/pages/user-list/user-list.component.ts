import { Component, OnInit } from '@angular/core';
import {User} from 'src/modules/shared/models/user'
import { UserListService } from '../../services/userList/user-list.service';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[]
  readonly usersRolesTraslated: Map<string,string> = new Map([
    ["ADMIN","Administrator"],
    ["BARTENDER","Šanker"],
    ["COOK","Kuvar"],
    ["MANAGER","Menadžer"],
    ["WAITER","Konobar"]])
  constructor(
    private userListService: UserListService,
    private notificationService: NotificationService

  ) {
    this.users = new Array<User>()
   }

  ngOnInit(): void {
    let usersRoles=["admin","bartender","cook","manager","waiter"]
    usersRoles.forEach(role=>{
      this.userListService.register(role).subscribe({
        next: (data)=>{
          this.users= this.users.concat(data)
        }
      })
    })
  }

}
