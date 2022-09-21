import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Brand } from '../../interfaces/brand.interface';
import { Car } from '../../interfaces/car.interface';
import { Color } from '../../interfaces/color.interface';
import { Type } from '../../interfaces/type.interface';
import { CarsService } from '../../services/cars.service';
import { GlobalMethodsService } from '../../services/global-methods.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  public addForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    type: ['', [Validators.required]],
    img: ['', [Validators.required]],
    availableColors: ['', [Validators.required]],
    elaborationDate: [new Date(), [Validators.required]],
  });
  public brands!: Brand[];
  public colors!: Color[];
  public types!: Type[];
  public noImg: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92oyoTxOiPElL64nNnOPZsWIu9KEdw8OHSQ&usqp=CAU';

  constructor(
    private fb: FormBuilder,
    private carsService: CarsService,
    private router: Router,
    private snackBar: MatSnackBar,
    public globalMethodsService: GlobalMethodsService
  ) {}

  ngOnInit(): void {
    this.carsService.getBrands().subscribe((brands) => (this.brands = brands));
    this.carsService.getColors().subscribe((colors) => (this.colors = colors));
    this.carsService.getTypes().subscribe((types) => (this.types = types));
  }

  getImgFromForm(): string | null {
    const img =
      this.addForm.controls['img'].value.trim() != ''
        ? this.addForm.controls['img'].value
        : null;
    return img;
  }

  saveCar() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
    let completeDate: Date = this.addForm.controls['elaborationDate']
      .value as Date;

    const car: Car = this.globalMethodsService.fillCarInterface(
      completeDate,
      this.addForm
    );

    this.addCar(car);
  }

  addCar(car: Car) {
    this.carsService.addCar(car).subscribe(({ id }: Car) => {
      // this.router.navigate(['/cars/edit', id]);
      this.router.navigate(['/cars/list']);
      this.globalMethodsService.showSnackbar(this.snackBar, 'Registro creado');
    });
  }
}
