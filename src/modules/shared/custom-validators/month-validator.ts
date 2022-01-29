import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function monthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { month: true };
    }

    return value < 1 || value > 12 ? { positiveNumber: true } : null;
  };
}