import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleCategoryModel } from 'src/app/core/model/res/vehicle-category.model';
import { VehicleCategoryService } from 'src/app/core/service/vehicle-category.service';
import { RentApplicationService } from 'src/app/core/service/rent-application.service';
import { ApplicationAddEditDialogModel } from '../application-list/application-list.component';
import { RentApplication } from 'src/app/core/model/res/rent-application.model';
import { ApplicationRequest } from 'src/app/core/model/req/application-request.model';
import { ActivatedRoute } from '@angular/router';

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
  vehicle!: FormControl;
  fromDate!: FormControl;
  toDate!: FormControl;
  applicationForm!: FormGroup;

  title!: string;
  action!: string;
  id!: number;
  application!: RentApplication;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ApplicationAddEditDialogModel,
    public dialogRef: MatDialogRef<ApplicationDialogComponent>,
    public vehicleCategoryService: VehicleCategoryService,
    public rentApplicationService: RentApplicationService,
  ) {
    this.title = data.title;
    this.action = data.action;
    this.application = data.applicationData;

  }

  ngOnInit(): void {
    this.listVehicleCategories();
    this.fromDate = new FormControl(this.application ? this.application.fromDate : '');
    this.toDate = new FormControl(this.application ? this.application.toDate : '');
    this.vehicle = new FormControl(this.application ? this.application.vehicleModel.id : '');

    this.applicationForm = new FormGroup({
      vehicle: this.vehicle,
      fromDate: this.fromDate,
      toDate: this.toDate,
    });
  }

  listVehicleCategories() {
    this.vehicleCategoryService.getVehicleCategories().subscribe((content) => {
      this.vehicleCategoryList = content;
    });
  }

  addUpdateApplication() {
    let req: ApplicationRequest = {
      fromDate:  this.convertDateFormat(new Date(this.applicationForm.controls.fromDate.value)),
      toDate:  this.convertDateFormat(new Date(this.applicationForm.controls.toDate.value)),
      vehicleModelId: this.applicationForm.controls.vehicle.value,
    };
    if (this.application.id) {
      this.rentApplicationService.updateApplication(this.application.id, req).subscribe();
    } else {
      this.rentApplicationService.createApplication(req).subscribe();
    }

    this.dialogRef.close(true);
  }

  convertDateFormat(date: Date) :string {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }
}
