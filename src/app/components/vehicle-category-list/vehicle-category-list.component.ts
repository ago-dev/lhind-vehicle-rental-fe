import { Component, OnInit } from '@angular/core';
import { VehicleCategoryModel } from 'src/app/core/model/res/vehicle-category.model';
import { VehicleCategoryService } from 'src/app/core/service/vehicle-category.service';

@Component({
  selector: 'app-vehicle-category-list',
  templateUrl: './vehicle-category-list.component.html',
  styleUrls: ['./vehicle-category-list.component.scss']
})
export class VehicleCategoryListComponent implements OnInit {
  vehicleCategoryList!: VehicleCategoryModel[];

  constructor(public vehicleCategoryService: VehicleCategoryService) { }

  ngOnInit(): void {
    this.listVehicleCategories();
  }

  listVehicleCategories() {
    this.vehicleCategoryService.getVehicleCategories().subscribe((content) => {
      this.vehicleCategoryList = content;
    })
  }

}
