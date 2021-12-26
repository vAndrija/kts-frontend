import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import {SelectModel} from "src/modules/shared/models/select-model"
import {RegistrationService} from "../../services/registration/registration.service"
import {RegisterUser} from "src/modules/shared/models/user"
import { NotificationService } from 'src/modules/shared/services/notification/notification.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup
  types: SelectModel[]
  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    this.form =  new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('',Validators.required),
      emailAddress: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      accountNumber: new FormControl('',Validators.required),
      phoneNumber: new FormControl('',Validators.required),
      userType: new FormControl('admin',Validators.required)
    })
    this.types = [
      new SelectModel('admin',"Administartor"),
      new SelectModel('manager','Menadžer'),
      new SelectModel('cook','Kuvar'),
      new SelectModel('bartender','Šanker'),
      new SelectModel('waiter','Konobar')
    ]
   }

  ngOnInit(): void {
  }

  submit() {
    const userType: string = this.form.value.userType
    const registrationData: RegisterUser  =  this.form.value;
    this.registrationService.register(registrationData,userType).subscribe({
      next: (data)=>{
        this.notificationService.success("Uspješno ste kreirali korisnika !");
        this.router.navigate(["/"]);
      },
      error: (error)=>{
        if(error.status === 401 || error.status === 403){
          this.notificationService.error("Greška pri kreiranju korisnika");
          this.router.navigate(["/auth/login"]);
        }
      }
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error) && this.form.get(control)?.touched;
  }

}
