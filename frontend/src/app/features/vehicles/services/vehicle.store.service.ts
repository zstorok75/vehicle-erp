import { inject, Service, signal, WritableSignal } from '@angular/core';
import { NewVehicle } from '../models/newVehicle.interface';
import { UpdateVehicle } from '../models/updateVehicle.interface';
import { VehicleApiService } from './vehicle.api.service';

@Service()
export class VehicleStoreService {
  private apiService = inject(VehicleApiService);

  private _vehicle: WritableSignal<UpdateVehicle | null> = signal(null);
  readonly vehicle = this._vehicle.asReadonly();

  private _vehicleList: WritableSignal<UpdateVehicle[]> = signal([]);
  readonly vehicleList = this._vehicleList.asReadonly();

  private _error: WritableSignal<string[] | null> = signal([]);
  readonly error = this._error.asReadonly();

  saveVehicle(newVehicle: NewVehicle): void {
    this.apiService.saveVehicle(newVehicle).subscribe({
      next: (vehicle: UpdateVehicle) => {
        this._vehicle.set(vehicle);
        this._error.set(null);
      },
      error: (err) => {
        this._error.set(err);
        this._vehicle.set(null);
      },
    });
  }

  updateVehicle(updatedVehicle: UpdateVehicle): void {
    const updateId: number = updatedVehicle.id;
    this.apiService.updateVehicle(updateId, updatedVehicle).subscribe({
      next: (updatedData: UpdateVehicle) => {
        this._vehicle.set(updatedData);
        this._error.set(null);
      },
      error: (err) => {
        this._error.set(err);
        this._vehicle.set(null);
      },
    });
  }

  getAllVehicles(): void {
    this.apiService.getAllVehicles().subscribe({
      next: (list) => {
        this._vehicleList.set(list);
        this._error.set(null);
      },
      error: (err) => {
        this._error.set(err);
        this._vehicleList.set([]);
      },
    });
  }

  getVehicleById(id: number): void {
    this.apiService.getVehicleById(id).subscribe({
      next: (vehicle: UpdateVehicle) => {
        this._vehicle.set(vehicle);
        this._error.set(null);
      },
      error: (err) => {
        this._error.set(err);
        this._vehicle.set(null);
      },
    });
  }
}
