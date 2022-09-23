import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EditComponent } from './edit.component';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { CarsService } from '../../services/cars.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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
    img: 'data:image/jpeg;base64,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',
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
      id: '1',
      name: 'Toyota',
    },
    {
      id: '2',
      name: 'Subaru',
    },
    {
      id: '3',
      name: 'Honda',
    },
  ];
  let types = [
    {
      id: '1',
      name: 'Automovil',
    },
    {
      id: '2',
      name: 'SUV',
    },
  ];
  let colors = [
    {
      id: '1',
      name: 'red',
    },
    {
      id: '2',
      name: 'black',
    },
    {
      id: '3',
      name: 'blue',
    },
    {
      id: '4',
      name: 'green',
    },
    {
      id: '5',
      name: 'gray',
    },
    {
      id: '6',
      name: 'brown',
    },
    {
      id: '7',
      name: 'orange',
    },
    {
      id: '8',
      name: 'purple',
    },
    {
      id: '9',
      name: 'yellow',
    },
    {
      id: '10',
      name: 'white',
    },
  ];

  beforeEach(async () => {
    testCarsServiceSpy = jasmine.createSpyObj<CarsService>('CarsService', [
      'getCarById',
      'getBrands',
      'getColors',
      'getTypes',
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
      schemas: [NO_ERRORS_SCHEMA],
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

  it('should create form with six fields', () => {
    expect(component.editForm.contains('name')).toBeTruthy();
    expect(component.editForm.contains('brand')).toBeTruthy();
    expect(component.editForm.contains('type')).toBeTruthy();
    expect(component.editForm.contains('img')).toBeTruthy();
    expect(component.editForm.contains('availableColors')).toBeTruthy();
    expect(component.editForm.contains('elaborationDate')).toBeTruthy();
  });

  it('Reactive form validation - name check', () => {
    let name = component.editForm.controls['name'];
    expect(name.valid).toBeTruthy();
    expect(name.value).toEqual('Rav4');
  });

  it('Reactive form validation - set empty name check', () => {
    let name = component.editForm.controls['name'];
    name.setValue(null);
    expect(name.valid).toBeFalsy();
    expect(name.errors!['required']).toBeTruthy();
  });
});
