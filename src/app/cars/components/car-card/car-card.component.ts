import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Car } from '../../interfaces/car.interface';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit {
  @Input() car?: Car;
  selectedColor: string = '';

  public getScreenWidth!: number;

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }

  setSelectedColor(color: string): void {
    this.selectedColor = color; 
  }
}
