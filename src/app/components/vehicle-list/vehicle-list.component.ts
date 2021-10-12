import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationDialogComponent } from '../application-dialog/application-dialog.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
})
export class VehicleListComponent implements OnInit {

  constructor(private dialogRef: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialogRef.open(ApplicationDialogComponent);
  }
}
