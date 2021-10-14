import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleCategoryModel } from '../model/res/vehicle-category.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleCategoryService {
  URL!: string;

  constructor(private httpClient: HttpClient) {
    this.URL = `${environment.baseURL}/vehicle-category/`;
  }

  getVehicleCategories(): Observable<VehicleCategoryModel[]> {
    return this.httpClient.get<VehicleCategoryModel[]>(`${this.URL}list`);
  }
}
