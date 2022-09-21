import { Component, Input } from '@angular/core';
import { Car } from '../../interfaces/car.interface';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent {
  @Input() car!: Car;
  selectedColor: string = '';


  setSelectedColor(color: string): void {
    this.selectedColor = color; 
  }
}
