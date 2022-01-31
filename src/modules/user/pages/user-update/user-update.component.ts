import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { Router } from "@angular/router";
import { UserService } from '../../services/user/user.service';
import { RegisterUser } from '../../model/register-user';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  form: FormGroup
  loggedUserId: number
  loggedUserRole : string = ""
  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
  ) { 
    this.loggedUserId = parseInt((localStorage.getItem('id') || '-1').toString())
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('',Validators.required),
      emailAddress: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      accountNumber: new FormControl('',Validators.required),
      phoneNumber: new FormControl('',Validators.required),
    })
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      {
        next: (data)=>{
          this.loggedUserId =  data.id;
          this.loggedUserRole = data.role;
          this.form.patchValue(data)
        },
        error: ()=>{
          this.notificationService.error("Došlo je do greške. Pokušajte ponovo.")
        }
      }
    )
  }

  submit(){
    const data : RegisterUser = this.form.value
    this.userService.updateUser(this.loggedUserId,this.loggedUserRole,data).subscribe({
      next: (data)=>{
        this.form.patchValue(data)
        this.notificationService.success("Uspješno ažurirane lične informacije.")
      },
      error: ()=>{
        this.notificationService.error("Došlo je do greške. Pokušajte ponovo.")
      }
    })
  }


  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error) && this.form.get(control)?.touched;
  }

}
