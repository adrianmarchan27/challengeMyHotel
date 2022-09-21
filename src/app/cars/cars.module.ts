import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CarsRoutingModule } from './cars-routing.module';

import { AddComponent } from './pages/add/add.component';
import { CarCardComponent } from './components/car-card/car-card.component';
import { CarComponent } from './pages/car/car.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { SearchComponent } from './pages/search/search.component';
import { ShowColorsComponent } from './components/show-colors/show-colors.component';
import { StringDatePipe } from './pipes/string-date.pipe';


@NgModule({
  declarations: [
    AddComponent,
    CarCardComponent,
    CarComponent,
    ConfirmComponent,
    EditComponent,
    HomeComponent,
    ListComponent,
    SearchComponent,
    ShowColorsComponent,
    StringDatePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarsRoutingModule,
    MaterialModule,
  ]
})
export class CarsModule { }
