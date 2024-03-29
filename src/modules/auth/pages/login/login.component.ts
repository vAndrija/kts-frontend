import { Component} from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Login } from '../../model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl('', Validators.required),
    });
  }


  submit(): void {
    const auth: Login = this.form.value;
    this.authService.login(auth).subscribe(
      (result) => {
        this.notificationService.success("Uspešno ste ulogovali!");
        const jwtUser = JSON.stringify(result);
        localStorage.setItem("user", jwtUser);
        const jwt: JwtHelperService = new JwtHelperService();
        const role = jwt.decodeToken(jwtUser).role;
        const id = jwt.decodeToken(jwtUser).id;
        localStorage.setItem("id", id);
        localStorage.setItem("role", role);
        if (role === "ROLE_BARTENDER") {
          this.authService.getUser("api/v1/bartender/" + id).subscribe(
            (result) => {
              localStorage.setItem("priority",String(result.priority));
            }
          )
        }
        if (role === "ROLE_COOK") {
          this.authService.getUser("api/v1/cook/" + id).subscribe(
            (result) => {
              localStorage.setItem("priority",String(result.priority));
            }
          )
        }
        this.router.navigate(["/menu/menu-items"]);

      },
      (error) => {
        if(error.status === 401) {
          this.notificationService.error("Pogrešni kredencijali. Pokušajte ponovo.");
        }
      }
    );
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error) && this.form.get(control)?.touched;
  }

}
