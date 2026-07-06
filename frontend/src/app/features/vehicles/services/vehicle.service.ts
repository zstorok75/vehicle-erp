import { HttpClient } from '@angular/common/http';
import { inject, Service, signal, WritableSignal } from '@angular/core';
import { Vehicle } from '../models/vehicle.interface';

@Service()
export class VehicleService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/vehicles';

  private _createdVehicle: WritableSignal<Vehicle | null> = signal(null);
  readonly createdVehicle = this._createdVehicle.asReadonly();

  private _error: WritableSignal<string[]> = signal([]);
  readonly error = this._error.asReadonly();

  saveVehicle(newVehicle: Vehicle): void {
    this.http.post<Vehicle>(this.apiUrl, newVehicle).subscribe({
      next: (vehicle) => {
        this._createdVehicle.set(vehicle);
      },
      error: (err) => this._error.set(err),
    });
  }
}
