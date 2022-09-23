import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Brand } from '../interfaces/brand.interface';
import { Car } from '../interfaces/car.interface';

import { CarsService } from './cars.service';

describe('CarsService', () => {
  let service: CarsService;
  let httpTestControl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarsService]
    });
    service = TestBed.inject(CarsService);
    httpTestControl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('httpClient Get method Bramds', () => {
    const testBrands: Brand[] = [
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

    service.getBrands().subscribe((brands) => {
      expect(testBrands).toBe(brands);
    });

    const req = httpTestControl.expectOne(service.baseUrl+'/brands');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(testBrands);

    httpTestControl.verify();
  });

  it('httpClient post method Cars', () => {
    const testCar: Car = {
      "id": "opq789",
      "name": "Civic",
      "brand": "Honda",
      "type": "Automovil",
      "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6MZZDhB2LvBHzQAr-YmaijzOlpuHgWbcsQ&usqp=CAU",
      "availableColors": [
        "gray",
        "red",
        "blue",
        "brown"
      ],
      "elaborationDate": "06-22-19,03:16 AM"
    };

    service.addCar(testCar).subscribe((car) => {
      expect(testCar).toBe(car);
    });

    const req = httpTestControl.expectOne(service.baseUrl+'/cars');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(testCar);

    httpTestControl.verify();
  });
});
