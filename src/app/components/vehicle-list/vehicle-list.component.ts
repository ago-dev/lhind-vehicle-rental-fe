import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RentApplication } from 'src/app/core/model/res/rent-application.model';
import { VehicleCategoryModel } from 'src/app/core/model/res/vehicle-category.model';
import { VehicleModelModel } from 'src/app/core/model/res/vehicle-model.model';
import { VehicleCategoryService } from 'src/app/core/service/vehicle-category.service';
import { ApplicationDialogComponent } from '../application-dialog/application-dialog.component';
import { ApplicationAddEditDialogModel } from '../application-list/application-list.component';

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

  openDialog(vehicleModel:VehicleModelModel) {
    console.log(vehicleModel);
    let title = 'Add';
    let action = 'add';
    let applicationData: RentApplication = {
      id: null!,
      fromDate: '',
      toDate: '',
      vehicleModel: vehicleModel,
    };
    const dialogData = new ApplicationAddEditDialogModel(title, action, applicationData);

    this.dialogRef.open(ApplicationDialogComponent, {
      data: 
        dialogData
  
    });
  }

  listVehicleCategories() {
    this.vehicleCategoryService.getVehicleCategories().subscribe((content) => {
      this.vehicleCategoryList = content;
    })
  }
}
