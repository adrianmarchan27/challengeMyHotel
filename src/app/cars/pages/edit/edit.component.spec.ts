import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EditComponent } from './edit.component';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { CarsService } from '../../services/cars.service';
class MatSnackBarStub {
  open() {
    return {
      onAction: () => of({}),
    };
  }
}
describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let testCarsServiceSpy: jasmine.SpyObj<CarsService>;
  let car = {
    id: 'abc123',
    name: 'Rav4',
    brand: 'Toyota',
    type: 'SUV',
    img: 'url',
    availableColors: [
      'red',
      'black',
      'blue',
      'green',
      'brown',
      'orange',
      'purple',
    ],
    elaborationDate: '06-16-21,08:08 AM',
  };
  let brands = [
    {
      "id": "1",
      "name": "Toyota"
    },
    {
      "id": "2",
      "name": "Subaru"
    },
    {
      "id": "3",
      "name": "Honda"
    }
  ];
  let types = [
    {
      "id": "1",
      "name": "Automovil"
    },
    {
      "id": "2",
      "name": "SUV"
    }
  ];
  let colors = [
    {
      "id": "1",
      "name": "red"
    },
    {
      "id": "2",
      "name": "black"
    },
    {
      "id": "3",
      "name": "blue"
    },
    {
      "id": "4",
      "name": "green"
    },
    {
      "id": "5",
      "name": "gray"
    },
    {
      "id": "6",
      "name": "brown"
    },
    {
      "id": "7",
      "name": "orange"
    },
    {
      "id": "8",
      "name": "purple"
    },
    {
      "id": "9",
      "name": "yellow"
    },
    {
      "id": "10",
      "name": "white"
    }
  ];

  beforeEach(async () => {
    testCarsServiceSpy = jasmine.createSpyObj<CarsService>('CarsService', [
      'getCarById', 'getBrands', 'getColors', 'getTypes'
    ]);

    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatDialogModule],
      providers: [
        CarsService,
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: '123abc' }) },
        },
        { provide: CarsService, useValue: testCarsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    testCarsServiceSpy.getCarById.and.returnValue(of(car));
    testCarsServiceSpy.getBrands.and.returnValue(of(brands));
    testCarsServiceSpy.getTypes.and.returnValue(of(types));
    testCarsServiceSpy.getColors.and.returnValue(of(colors));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
