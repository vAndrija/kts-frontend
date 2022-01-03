import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from '../../services/auth/auth.service';
import { Login } from 'src/modules/shared/models/login';
import { of } from 'rxjs';
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

  ngOnInit(): void {
  }

  submit(): void {
    const auth: Login = this.form.value;
    this.authService.login(auth).subscribe(
      (result) => {
        this.notificationService.success("Successful login!");
        const jwtUser = JSON.stringify(result);
        localStorage.setItem("user", jwtUser);
        const jwt: JwtHelperService = new JwtHelperService();
        const role = jwt.decodeToken(jwtUser).role;
        const id = jwt.decodeToken(jwtUser).id;
        localStorage.setItem("id", id);
 
        localStorage.setItem("role", role);
        this.router.navigate(["/"]);

      },
      (error) => {
        if(error.status === 401) {
          this.notificationService.error("Wrong credentials. Try again.");
        }
      }
    );
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error) && this.form.get(control)?.touched;
  }

}
