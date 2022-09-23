import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AddComponent } from './add.component';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
class MatSnackBarStub{
  open(){
    return {
      onAction: () => of({})
    }
  }

}

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule, ],
      providers: [{provide: MatSnackBar, useClass: MatSnackBarStub}],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with six fields', () => {
    expect(component.addForm.contains('name')).toBeTruthy();
    expect(component.addForm.contains('brand')).toBeTruthy();
    expect(component.addForm.contains('type')).toBeTruthy();
    expect(component.addForm.contains('img')).toBeTruthy();
    expect(component.addForm.contains('availableColors')).toBeTruthy();
    expect(component.addForm.contains('elaborationDate')).toBeTruthy();
  });

  it('Reactive form validation - name check', () => {
    let name = component.addForm.controls['name'];
    expect(name.valid).toBeFalsy();
    expect(name.errors!['required']).toBeTruthy();
  });

  it('Reactive form validation - set empty name check', () => {
    let name = component.addForm.controls['name'];
    name.setValue('Rav4');
    expect(name.valid).toBeTruthy();
    expect(name.value).toEqual('Rav4');
  });
});
