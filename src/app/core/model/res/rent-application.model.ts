import { VehicleModelModel } from "./vehicle-model.model";

export interface RentApplication {
    id: number;
    vehicleModel: VehicleModelModel;
    fromDate: string;
    toDate: string;
  }