import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StringDatePipe } from '../../pipes/string-date.pipe';

import { CarCardComponent } from './car-card.component';

describe('CarCardComponent', () => {
  let component: CarCardComponent;
  let fixture: ComponentFixture<CarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCardComponent, StringDatePipe ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
