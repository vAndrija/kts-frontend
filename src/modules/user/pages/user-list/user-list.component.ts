import { Component, OnInit } from '@angular/core';
import {User} from 'src/modules/shared/models/user'
import { UserListService } from '../../services/userList/user-list.service';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[]
  form: FormGroup
  readonly usersRolesTraslated: Map<string,string> = new Map([
    ["ADMIN","Administrator"],
    ["BARTENDER","Šanker"],
    ["COOK","Kuvar"],
    ["MANAGER","Menadžer"],
    ["WAITER","Konobar"]])
  readonly loggedUserRole : String | null  =  localStorage.getItem('role');
  loggedUserId : number;

  constructor(
    private userListService: UserListService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.users = new Array<User>()
    this.loggedUserId = parseInt((localStorage.getItem('id') || '-1').toString())
    this.form =  new FormGroup({
      name: new FormControl('andriaj', Validators.required),
      emailAddress: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      priority: new FormControl(false,Validators.required),
      salary: new FormControl('',Validators.required)
    })
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

  deleteUser(event:Event,user:User): void {
    event.preventDefault();
    this.userListService.delete(user.id,user.role.toLowerCase()).subscribe({
      next: ()=> {
        this.notificationService.success("Uspjesno izbrisan korisnik.")
        this.users = this.users.filter((currentUser)=>(currentUser.id!==user.id))  
      },
      error: ()=>{
        this.notificationService.error("Korisnik je trenutno zaduzen za odredjeni posao.")
      }
    })
  }
  editUser(event:Event,user:User): void {
    this.form.patchValue({
      name : user.name + " " + user.lastName,
      emailAddress : user.emailAddress,
      salary : user.salaryDto.value
    })
    event.preventDefault();
  }

  submit(){
    console.log(this.form.value)
    }

}
