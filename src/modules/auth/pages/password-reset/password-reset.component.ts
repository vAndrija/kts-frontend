import { Component } from '@angular/core';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { PasswordResetHomeService } from '../../services/password-reset-home/password-reset-home.service';
import { samePasswordValidator } from 'src/modules/shared/custom-validators/same-password-validator';
import { ResetPasswordModel } from '../../model/reset-password-model';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  form: FormGroup
  token: string | undefined

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private passwordResetHomeService : PasswordResetHomeService,
    private route: ActivatedRoute
  ) { 
    this.form =  new FormGroup({
      password: new FormControl('',Validators.required),
      repeatedPassword: new FormControl('',Validators.compose([Validators.required]))
    },{validators:samePasswordValidator})
    this.token = this.route.snapshot.paramMap.get('token')?.toString()
  }
  
  submit(): void {
    const data : ResetPasswordModel = {
      password : this.form.value.password,
      token: "" + this.token
    };
    this.passwordResetHomeService.finishResetToken(data).subscribe({
      next: ()=>{
        this.notificationService.success("Uspješno restartovana lozinka")
        this.router.navigate(["/auth/login"]);
      },
      error: ()=>{
        this.notificationService.error("Greška. Pokušajte proceduru zaboravljene lozinke uraditi ispočetka")
      }
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error) && this.form.get(control)?.touched;
  }
}
