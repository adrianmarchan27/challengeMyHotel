import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListComponent } from './list.component';
import { MatMenuModule } from '@angular/material/menu';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StringDatePipe } from '../../pipes/string-date.pipe';
import { CarsService } from '../../services/cars.service';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let stringDatePipe: StringDatePipe;
  let service: CarsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [HttpClientTestingModule, MatMenuModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    stringDatePipe = new StringDatePipe();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(CarsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('unit test case for String Date Pipe - date time', () => {
    expect(stringDatePipe.transform("12-18-21,09:25 AM")).toEqual("18/12/2021, 09:25 AM");
  });

  it('unit test case for String Date Pipe - date', () => {
    expect(stringDatePipe.transform("12-18-21,09:25 AM", "date")).toEqual("18/12/2021");
  });

  it('unit test case for String Date Pipe - time', () => {
    expect(stringDatePipe.transform("12-18-21,09:25 AM", "time")).toEqual("09:25 AM");
  });

  it('unit test for subscribe method getCarById', fakeAsync(() => {
    let spy = spyOn(service, 'getCars').and.returnValue(of([{
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
    }]));
    let subSpy = spyOn(service.getCars(), 'subscribe');
    component.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));
});
