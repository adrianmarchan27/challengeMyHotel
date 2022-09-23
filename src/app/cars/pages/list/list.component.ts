import { Component, OnInit } from '@angular/core';
import { Car } from '../../interfaces/car.interface';
import { CarsService } from '../../services/cars.service';
import { GlobalMethodsService } from '../../services/global-methods.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public cars: Car[] = [];
  public title: string = 'Listado de vehículos';

  constructor(
    private carsService: CarsService,
    private globalMethodsService: GlobalMethodsService
  ) {}

  ngOnInit(): void {
    this.carsService.getCars().subscribe((cars) => (this.cars = cars));
  }

  sortBy(field: keyof Car, direction: 'ascending' | 'descending' | 'none') {
    this.cars = this.globalMethodsService.sortBy(this.cars, field, direction);
  }
}
