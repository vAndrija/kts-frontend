import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from 'moment';

export function periodValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {  
    const reservationDate = control.get("reservationDate")?.value;
    const reservationStart = control.get("reservationStart")?.value;
    const reservationEnd = control.get("reservationEnd")?.value;

    if (!reservationStart || !reservationEnd) {
      return null;
    }

    const isValid = moment(`${reservationDate} ${reservationStart}`) < moment(`${reservationDate} ${reservationEnd}`);

    return !isValid ? { validTime: true } : null;
  };
}