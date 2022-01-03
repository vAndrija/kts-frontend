import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from 'moment';

export function datetimePickerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const tokens = value.split(" ");

    if (tokens.length !== 2) {
      return null;
    }

    const isValidStartDate = moment(tokens[0]).isValid();
    const isValidEndDate = moment(tokens[1]).isValid();
    const isValidDatetime = isValidStartDate && isValidEndDate;

    return !isValidDatetime ? { validDateTime: true } : null;
  };
}