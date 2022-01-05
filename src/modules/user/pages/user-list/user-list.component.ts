import { Component, OnInit } from '@angular/core';
import {User} from 'src/modules/shared/models/user'
import { UserListService } from '../../services/userList/user-list.service';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Salary } from 'src/modules/shared/models/salary';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[]
  form: FormGroup
  currentRolePriority: boolean
  currentUserPriority: boolean
  currentUserEditingId: number
  currentUserEditingType: string
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
    this.currentRolePriority = false
    this.currentUserPriority = false
    this.currentUserEditingId = -1
    this.currentUserEditingType = ""
    this.form =  new FormGroup({
      name: new FormControl('andriaj', Validators.required),
      userEmail: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      priority: new FormControl(false,Validators.required),
      value: new FormControl('',Validators.required)
    })
   }

  ngOnInit(): void {
    let usersRoles=["admin","bartender","cook","manager","waiter"]
    usersRoles.forEach(role=>{
      this.userListService.getUsers(role).subscribe({
        next: (data)=>{
          this.users= this.users.concat(data)
        }
      })
    })
  }

  deleteUser(user:User): void {
    this.userListService.delete(user.id,user.role.toLowerCase()).subscribe({
      next: ()=> {
        this.notificationService.success("Uspješno izbrisan korisnik.")
        this.users = this.users.filter((currentUser)=>(currentUser.id!==user.id))  
      },
      error: ()=>{
        this.notificationService.error("Korisnik je trenutno zadužen za određeni posao.")
      }
    })
  }

  editUser(user:User): void {
    if(user.role==="COOK" || user.role==="BARTENDER"){
      this.currentRolePriority = true;
      this.currentUserPriority = user.priority;
      this.currentUserEditingId = user.id;
      this.currentUserEditingType = user.role
    }
    this.form.patchValue({
      name : user.name + " " + user.lastName,
      userEmail : user.emailAddress,
      value : user.salaryDto.value,
      priority: user.priority
    })
  }

  submit(): void {
    let salary: Salary  =  this.form.value;
    let currentDate =  new Date()
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();
    salary.endDate = new Date(year + 1, month, day);
    salary.startDate = new Date(year,month,day);
    if(this.currentRolePriority && this.currentUserPriority!==this.form.value.priority){
      this.userListService.updatePriority(this.currentUserEditingId,this.currentUserEditingType.toLowerCase()).subscribe({
        error: () =>{
          this.notificationService.error("Došlo je do greške pri ažuriranju. Pokušajte ponovo")
        }
      })
    }
    this.currentRolePriority = false;
    this.userListService.updateSalary(salary).subscribe({
      next: ()=> {
        this.notificationService.success("Uspješno ažurirana plata radnika.")
      },
      error: () => {
        this.notificationService.error("Došlo je do greške pri ažuriranju. Pokušajte ponovo")
      }
    })
    }
}
