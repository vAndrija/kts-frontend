import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const  samePasswordValidator: ValidatorFn =  (control: AbstractControl): ValidationErrors | null => {
      const first = control.get('password')?.value;
      const second = control.get('repeatedPassword')?.value;

      return first!==second ? {samePassword: true} :null;
      };