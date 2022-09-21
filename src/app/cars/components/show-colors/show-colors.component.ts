import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-show-colors',
  templateUrl: './show-colors.component.html',
  styleUrls: ['./show-colors.component.scss'],
})
export class ShowColorsComponent {
  @Input() colors!: string[];
  @Input() canSelectColor: boolean = false;
  @Output() selectedColor: EventEmitter<string> = new EventEmitter<string>();

  public colorWithCheck: string = '';

  chooseColor(color: string) {
    if (!this.canSelectColor) return;
    if (this.colorWithCheck === color) this.colorWithCheck = '';
    else this.colorWithCheck = color;
    this.selectedColor.emit(this.colorWithCheck);
  }
}
