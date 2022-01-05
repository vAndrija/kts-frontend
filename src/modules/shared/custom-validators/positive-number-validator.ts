import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from 'moment';

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { positiveNumber: true };
    }

    return !value.toString().match("^[+]?[1-9]+([.]\[0-9]+)?$") ? { positiveNumber: true } : null;
  };
}