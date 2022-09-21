import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Car } from '../../interfaces/car.interface';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public cars: Car[] = [];
  public search: FormControl = new FormControl('');
  public carSelected!: Car | undefined;
  public debouncer: Subject<string> = new Subject();

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe((suggest: string) =>
        this.carsService
          .getSuggestion(suggest.trim())
          .subscribe((cars) => (this.cars = cars))
      );
  }

  searching() {
    this.debouncer.next(this.search.value);
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.carSelected = undefined;
      return;
    }
    const car: Car = event.option.value;
    this.search.setValue(car.name);
    this.carsService
      .getCarById(car.id!)
      .subscribe((car) => (this.carSelected = car));
  }
}
