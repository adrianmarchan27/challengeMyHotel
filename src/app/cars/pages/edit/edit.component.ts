import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

import { Brand } from '../../interfaces/brand.interface';
import { Car } from '../../interfaces/car.interface';
import { Color } from '../../interfaces/color.interface';
import { Type } from '../../interfaces/type.interface';
import { CarsService } from '../../services/cars.service';
import { GlobalMethodsService } from '../../services/global-methods.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public editForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(15)]],
    brand: ['', [Validators.required]],
    type: ['', [Validators.required]],
    img: ['', [Validators.required]],
    availableColors: ['', [Validators.required]],
    elaborationDate: [new Date(), [Validators.required]],
  });
  public maxDate: Date = new Date();
  public brands!: Brand[];
  public colors!: Color[];
  public types!: Type[];
  private lastDateValue!: Date;
  private car!: Car;
  public noImg: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92oyoTxOiPElL64nNnOPZsWIu9KEdw8OHSQ&usqp=CAU';

  constructor(
    private fb: FormBuilder,
    private carsService: CarsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public globalMethodsService: GlobalMethodsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.carsService.getCarById(id)))
      .subscribe((car) => {
        this.car = car;
        this.editForm.controls['name'].setValue(car.name);
        this.editForm.controls['brand'].setValue(car.brand);
        this.editForm.controls['type'].setValue(car.type);
        this.editForm.controls['img'].setValue(car.img);
        this.editForm.controls['availableColors'].setValue(car.availableColors);
        this.lastDateValue = this.globalMethodsService.stringToDate(car.elaborationDate) as Date;
        this.editForm.controls['elaborationDate'].setValue(this.lastDateValue);
      });
    this.carsService.getBrands().subscribe((brands) => (this.brands = brands));
    this.carsService.getColors().subscribe((colors) => (this.colors = colors));
    this.carsService.getTypes().subscribe((types) => (this.types = types));
  }

  getImgFromForm(): string | null {
    const img =
      this.editForm.controls['img'].value.trim() != ''
        ? this.editForm.controls['img'].value
        : null;
    return img;
  }

  saveCar() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    let completeDate: Date = this.editForm.controls['elaborationDate']
      .value as Date;

    const car: Car = this.globalMethodsService.fillCarInterface(
      completeDate,
      this.editForm,
      this.lastDateValue != completeDate
    );

    this.editCar(car);
  }

  editCar(car: Car) {
    car.id = this.car.id!;
    this.carsService.updateCar(car).subscribe((_) => {
      this.router.navigate(['/cars/list']);
      this.globalMethodsService.showSnackbar(
        this.snackBar,
        'Registro actualizado'
      );
    });
  }

  deleteCar() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { ...this.car },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.carsService.deleteCar(this.car.id!).subscribe((_) => {
          this.router.navigate(['/heroes/list']);
          this.globalMethodsService.showSnackbar(
            this.snackBar,
            'Registro eliminado'
          );
        });
      }
    });
  }

  comeBack() {
    this.router.navigate(['/heroes/list']);
  }
}
