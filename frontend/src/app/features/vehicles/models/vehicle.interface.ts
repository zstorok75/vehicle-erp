export interface Vehicle {
  id?: number;
  licensePlate?: string;
  vin: string;
  brand: string;
  model: string;
  productionYear: number;
  createdAt?: string;
}
