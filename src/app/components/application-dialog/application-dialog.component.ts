import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleCategoryModel } from 'src/app/core/model/res/vehicle-category.model';
import { VehicleCategoryService } from 'src/app/core/service/vehicle-category.service';

export interface DialogData {
  carName: string;
}

@Component({
  selector: 'app-application-dialog',
  templateUrl: './application-dialog.component.html',
  styleUrls: ['./application-dialog.component.scss'],
})
export class ApplicationDialogComponent implements OnInit {
  vehicleCategoryList!: VehicleCategoryModel[];
  vehicleControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<ApplicationDialogComponent>,
    public vehicleCategoryService: VehicleCategoryService
  ) {
  }

  ngOnInit(): void {
    this.listVehicleCategories();
  }

  listVehicleCategories() {
    this.vehicleCategoryService.getVehicleCategories().subscribe((content) => {
      this.vehicleCategoryList = content;
    });
  }
}
