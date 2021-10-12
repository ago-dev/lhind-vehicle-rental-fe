import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface DialogData {
  carName: string;
}

@Component({
  selector: 'app-application-dialog',
  templateUrl: './application-dialog.component.html',
  styleUrls: ['./application-dialog.component.scss'],
})
export class ApplicationDialogComponent implements OnInit {
  vehicleControl = new FormControl();

  constructor() {}

  ngOnInit(): void {}
}
