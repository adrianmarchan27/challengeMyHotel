import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Car } from '../interfaces/car.interface';
import { Brand } from '../interfaces/brand.interface';
import { Color } from '../interfaces/color.interface';
import { Type } from '../interfaces/type.interface';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/cars`);
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.baseUrl}/brands`);
  }

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(`${this.baseUrl}/colors`);
  }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.baseUrl}/types`);
  }
  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/cars/${id}`);
  }

  getSuggestion(suggest: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/cars?q=${suggest}&_limit=10`);
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.baseUrl}/cars`, car);
  }

  updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.baseUrl}/cars/${car.id}`, car);
  }

  deleteCar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cars/${id}`);
  }
}