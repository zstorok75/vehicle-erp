import { HttpClient } from '@angular/common/http';
import { inject, Service, signal, WritableSignal } from '@angular/core';
import { NewVehicle } from '../models/newVehicle.interface';
import { UpdateVehicle } from '../models/updateVehicle.interface';

@Service()
export class VehicleService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/vehicles';

  private _createdVehicle: WritableSignal<Vehicle | null> = signal(null);
  readonly createdVehicle = this._createdVehicle.asReadonly();

  private _vehicleList: WritableSignal<UpdateVehicle[]> = signal([]);
  readonly vehicleList = this._vehicleList.asReadonly();

  private _error: WritableSignal<string[]> = signal([]);
  readonly error = this._error.asReadonly();

  saveVehicle(newVehicle: NewVehicle): void {
    this.http.post<UpdateVehicle>(this.apiUrl, newVehicle).subscribe({
      next: (vehicle: UpdateVehicle) => {
        this._vehicle.set(vehicle);
      },
      error: (err) => this._error.set(err),
    });
  }

  getAllVehicles(): void {
    this.http.get<UpdateVehicle[]>(this.apiUrl).subscribe({
      next: (list) => {
        this._vehicleList.set(list);
      },
      error: (err) => {
        this._error.set(err);
      },
    });
  }
}
