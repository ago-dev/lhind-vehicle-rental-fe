import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleCategoryModel } from 'src/app/core/model/res/vehicle-category.model';
import { VehicleCategoryService } from 'src/app/core/service/vehicle-category.service';
import { ApplicationRequest } from 'src/app/core/model/req/application-req.model';
import { RentApplicationService } from 'src/app/core/service/rent-application.service';

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
  vehicleControl!: FormControl;
  fromDate!: FormControl;
  toDate!: FormControl;
  applicationForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ApplicationDialogComponent>,
    public vehicleCategoryService: VehicleCategoryService,
    public rentApplicationService: RentApplicationService
  ) {}

  ngOnInit(): void {
    this.listVehicleCategories();
    this.vehicleControl = new FormControl('');
    this.fromDate = new FormControl('');
    this.toDate = new FormControl('');

    this.applicationForm = new FormGroup({
      vehicle: this.vehicleControl,
      fromDate: this.fromDate,
      toDate: this.toDate,
    });
  }

  listVehicleCategories() {
    this.vehicleCategoryService.getVehicleCategories().subscribe((content) => {
      this.vehicleCategoryList = content;
    });
  }

  add() {
    let req: ApplicationRequest = {
      fromDate:  this.convertDateFormat(new Date(this.applicationForm.controls.fromDate.value)),
      toDate:  this.convertDateFormat(new Date(this.applicationForm.controls.toDate.value)),
      vehicleModelId: this.applicationForm.controls.vehicle.value,
    };
 
    this.rentApplicationService.createApplication(req).subscribe();
    this.dialogRef.close(true);
  }

  convertDateFormat(date: Date) :string {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    console.log(mm + '/' + dd + '/' + yyyy);
    
    return dd + '/' + mm + '/' + yyyy;
  }
}
