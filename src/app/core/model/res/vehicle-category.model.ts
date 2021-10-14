import { VehicleModelModel } from "./vehicle-model.model";

export interface VehicleCategoryModel {
    id: number,
    name: string;
    description: string;
    vehicleModels: VehicleModelModel[];
  }
  