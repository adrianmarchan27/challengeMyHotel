import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Car } from '../interfaces/car.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalMethodsService {
  constructor() {}

  sortBy<T>(
    data: T[],
    keyToSort: keyof T,
    direction: 'ascending' | 'descending' | 'none'
  ) {
    if (direction === 'none') {
      return data;
    }
    const compare = (objectA: T, objectB: T) => {
      const valueA = Array.isArray(objectA[keyToSort])
        ? (objectA[keyToSort] as unknown as []).length
        : objectA[keyToSort];
      const valueB = Array.isArray(objectB[keyToSort])
        ? (objectB[keyToSort] as unknown as []).length
        : objectB[keyToSort];

      if (valueA === valueB) {
        return 0;
      }

      if (valueA > valueB) {
        return direction === 'ascending' ? 1 : -1;
      } else {
        return direction === 'ascending' ? -1 : 1;
      }
    };

    if (keyToSort.toString().toLocaleLowerCase().includes('date')) {
      return data.sort((a: T, b: T) =>
        direction === 'ascending'
          ? (this.stringToDate(a[keyToSort] as unknown as string, true) as  number) -
            (this.stringToDate(b[keyToSort] as unknown as string, true) as  number)
          : (this.stringToDate(b[keyToSort] as unknown as string, true) as  number) -
            (this.stringToDate(a[keyToSort] as unknown as string, true) as  number)
      );
    }
    return data.slice().sort(compare);
  }

  stringToDate(
    stringDate: string,
    neededNumberResponse: boolean = false
  ): number | Date {
    const [date, time] = stringDate.split(',');
    const [month, day, year] = date.split('-');
    const [hours, minutes] = time.split(':');
    let currentYear = new Date().getFullYear().toString().substring(2, 4);
    let completeYear = (year <= currentYear ? '20' : '19') + year;
    if (neededNumberResponse)
      return new Date(
        +completeYear,
        +month - 1,
        +day,
        minutes.substring(3, 5) === 'PM' ? +hours + 12 : +hours,
        +minutes.substring(0, 2),
        +'00'
      ).getTime();
    return new Date(
      +completeYear,
      +month - 1,
      +day,
      minutes.substring(3, 5) === 'PM' ? +hours + 12 : +hours,
      +minutes.substring(0, 2),
      +'00'
    );
  }

  fillCarInterface(
    completeDate: Date,
    form: FormGroup<any>,
    mustChangeDate?: boolean
  ): Car {
    let id: string = '';
    let [day, month, year, hour, minutes]: string[] = [
      this.padTo2Digits(completeDate.getDate()),
      this.padTo2Digits(completeDate.getMonth() + 1),
      completeDate.getFullYear().toString().substring(2, 4),
      this.padTo2Digits(
        (mustChangeDate ? new Date() : completeDate).getHours()
      ),
      this.padTo2Digits(
        (mustChangeDate ? new Date() : completeDate).getSeconds()
      ),
    ];
    let elaborationDate: string = `${month}-${day}-${year},${hour}:${minutes} ${
      +hour > 11 ? 'PM' : 'AM'
    }`;

    let car: Car = { id, ...form.value };

    car.elaborationDate = elaborationDate;

    return car;
  }

  padTo2Digits(num: number): string {
    return num.toString().padStart(2, '0');
  }

  showSnackbar(snackBar: MatSnackBar, message: string): void {
    snackBar.open(message, 'ok!', {
      duration: 2500,
    });
  }

  getHasRequiredError(form: FormGroup<any>, formControlName: string) {
    return form.controls[formControlName].hasError('required');
  }

  getMessageIsRequired() {
    return 'El campo es requerido';
  }
}
