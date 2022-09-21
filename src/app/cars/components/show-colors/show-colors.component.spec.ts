import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowColorsComponent } from './show-colors.component';

describe('ShowColorsComponent', () => {
  let component: ShowColorsComponent;
  let fixture: ComponentFixture<ShowColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowColorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
