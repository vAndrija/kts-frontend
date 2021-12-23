import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form =  new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      accountNumber: new FormControl('',Validators.required),
      phoneNumber: new FormControl('',Validators.required)
    })
   }

  ngOnInit(): void {
  }

  submit() {
    console.log("Andrija")
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error) && this.form.get(control)?.touched;
  }

}
