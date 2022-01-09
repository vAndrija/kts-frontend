import { Component } from '@angular/core';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { PasswordResetHomeService } from '../../services/password-reset-home/password-reset-home.service';
import { ResetPasswordModel } from 'src/modules/shared/models/login';

@Component({
  selector: 'app-password-reset-home',
  templateUrl: './password-reset-home.component.html',
  styleUrls: ['./password-reset-home.component.scss']
})
export class PasswordResetHomeComponent{
  form: FormGroup
  submitted: boolean = false
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private passwordResetHomeService : PasswordResetHomeService
  ) { 
    this.form =  new FormGroup({
      email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
    })
  }

  

  submit(): void {
    let data : ResetPasswordModel = this.form.value
    this.submitted = true;
    this.passwordResetHomeService.sendResetToken(data).subscribe({
      next: ()=>{
        this.notificationService.success("Link za resetovanje je poslat na vašu email adresu")
        
      },
      error: ()=>{
        this.notificationService.error("Greška. Pokušajte ponovo")
        this.submitted = false;
      }
    })
  }

}
