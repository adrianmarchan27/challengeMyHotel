import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Car } from '../../interfaces/car.interface';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  public expansionPanelContent: [string, string | string[]][] = [];
  public car!: Car;
  public image: string = '';
  public step: number = 0;
  public selectedColor: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private carsService: CarsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.carsService.getCarById(id)))
      .subscribe(({ id, img, ...rest }: Car) => {
        this.image = img;
        Object.keys(rest).forEach((key: string, index: number) => {
          this.expansionPanelContent.push([this.translate(key).toLowerCase(), Object.values(rest)[index]]);
        });
        return (this.car = { id, img, ...rest });
      });
  }

  comeBack() {
    this.router.navigate(['/heroes/list']);
  }

  setStep(index: number) {
    this.step = index;
  }

  setSelectedColor(color: string): void {
    this.selectedColor = color;
  }

  castInputOfColors(content: string | string[]): string[] {
    return content instanceof Array<string> ? content : [];
  }

  translate(key: string): string {
    switch (key) {
      case 'name':
        return 'modelo';
      case 'brand':
        return 'marca';
      case 'type':
        return 'tipo de vehículo';
      case 'availableColors':
        return 'colores disponibles';
      case 'elaborationDate':
        return 'fecha de elaboración';
      default:
        return '';
    }
  }
}
