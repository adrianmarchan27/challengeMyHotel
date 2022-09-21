import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from '../../interfaces/car.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  deleteCar() {
    this.dialogRef.close(true);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
