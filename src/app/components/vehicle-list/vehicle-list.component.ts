import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehicleCategoryModel } from 'src/app/core/model/res/vehicle-category.model';
import { VehicleCategoryService } from 'src/app/core/service/vehicle-category.service';
import { ApplicationDialogComponent } from '../application-dialog/application-dialog.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
})
export class VehicleListComponent implements OnInit {
  vehicleCategoryList!: VehicleCategoryModel[];

  constructor(private dialogRef: MatDialog, public vehicleCategoryService: VehicleCategoryService) {}

  ngOnInit(): void {
    this.listVehicleCategories();
  }

  openDialog() {
    this.dialogRef.open(ApplicationDialogComponent, {
      data: {
        vehicleCategoryList: this.vehicleCategoryList
      }
    });
  }

  listVehicleCategories() {
    this.vehicleCategoryService.getVehicleCategories().subscribe((content) => {
      this.vehicleCategoryList = content;
    })
  }
}
