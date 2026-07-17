export interface NewVehicle {
  id?: number;
  licensePlate?: string;
  vin: string;
  brand: string;
  model: string;
  productionYear: number;
  createdAt?: string;
}
