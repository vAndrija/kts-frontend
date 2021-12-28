import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateTime'
})
export class CustomDateTimePipe  implements PipeTransform {

  transform(value: any): any {
    if(value[4] == 0){
      return `${value[2]}.${value[1]}.${value[0]} ${value[3]}:${value[4]}0`;
    }
    return `${value[2]}.${value[1]}.${value[0]} ${value[3]}:${value[4]}`;
  }

}
