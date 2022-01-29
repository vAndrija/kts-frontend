import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { positiveNumber: true };
    }

    return !value.toString().match("^[+]?[0-9]+([.]\[0-9]+)?$") ? { positiveNumber: true } : null;
  };
}