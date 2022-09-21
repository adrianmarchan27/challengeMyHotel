import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringDate'
})
export class StringDatePipe implements PipeTransform {

  transform(stringDate: string, result?: 'date' | 'time'): string {
    const [date, time] = stringDate.split(',');
    const [month, day, year] = date.split('-');
    let currentYear = new Date().getFullYear().toString().substring(2,4)

    switch (result) {
      case 'date':
        return `${day}/${month}/${year <= currentYear ? '20' : '19'}${year}`;
      case 'time':
        return time; 
      default:
        return `${day}/${month}/${year <= currentYear ? '20' : '19'}${year}, ${time}`;
    }
  }

}
