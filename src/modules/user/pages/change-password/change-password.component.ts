import { Component } from '@angular/core';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ChangePasswordModel } from 'src/modules/shared/models/login';
import { samePasswordValidator } from 'src/modules/shared/custom-validators/same-password-validator';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  form: FormGroup

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private userService: UserService
  ) {
    this.form =  new FormGroup({
      oldPassword: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      repeatedPassword: new FormControl('',Validators.compose([Validators.required]))
    },{validators:samePasswordValidator})
   }

  submit(): void {
    const data: ChangePasswordModel =  this.form.value;
    this.userService.changePassword(data).subscribe({
      next: ()=>{
        this.notificationService.success("Uspješno promjenjena lozinka.")
        this.router.navigate(["/menu/menu-items"]);
      },
      error: (e)=>{
        if(e.status===409)
          this.notificationService.error("Stara lozinka nije ispravna.")
        else
          this.notificationService.error("Došlo je do greške. Pokušajte ponovo.")
      }
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error) && this.form.get(control)?.touched;
  }
}
