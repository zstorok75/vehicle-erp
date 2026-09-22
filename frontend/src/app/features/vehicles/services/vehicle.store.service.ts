import { inject, Service, signal, WritableSignal } from '@angular/core';
import { NewVehicle } from '../models/newVehicle.interface';
import { UpdateVehicle } from '../models/updateVehicle.interface';
import { VehicleApiService } from './vehicle.api.service';
import { ApiResponse } from '../../../core/models/api-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbar } from '../../../core/layout/success-snackbar/success-snackbar';

@Service()
export class VehicleStoreService {
  private apiService = inject(VehicleApiService);
  private _snackBar = inject(MatSnackBar);
  private _snackBarDurationMs = signal(5000);

  private _vehicle: WritableSignal<UpdateVehicle | null> = signal(null);
  readonly vehicle = this._vehicle.asReadonly();

  private _vehicleList: WritableSignal<UpdateVehicle[] | null> = signal(null);
  readonly vehicleList = this._vehicleList.asReadonly();

  private _error: WritableSignal<string[] | string> = signal('');
  readonly error = this._error.asReadonly();

  private _message: WritableSignal<string[] | string> = signal('');
  readonly message = this._message.asReadonly();

  clearError(): void {
    this._error.set('');
  }

  clearVehicle(): void {
    this._vehicle.set(null);
  }

  clearVehicleList(): void {
    this._vehicleList.set(null);
  }

  clearMessage(): void {
    this._message.set('');
  }

  saveVehicle(newVehicle: NewVehicle): void {
    this.apiService.saveVehicle(newVehicle).subscribe({
      next: (response: ApiResponse<UpdateVehicle>) => {
        this._vehicle.set(response.data!);
        this._message.set(response.message);
        this.clearError();
        this.openSnackBar(`Sikeresen létrehozva a(z) ${response.data!.vin} alvázszámú jármű!`);
      },
      error: (err: HttpErrorResponse) => {
        const response: ApiResponse<undefined> = err.error;
        this._error.set(response.message);
        this.clearVehicle();
        this.clearMessage();
      },
    });
  }

  updateVehicle(updatedVehicle: UpdateVehicle): void {
    const updateId: number = updatedVehicle.id;
    this.apiService.updateVehicle(updateId, updatedVehicle).subscribe({
      next: (response: ApiResponse<UpdateVehicle>) => {
        this._vehicle.set(response.data!);
        this._message.set(response.message);
        this.clearError();
        this.openSnackBar(
          `Sikeresen módosítva a(z) ${response.data!.vin} alvázszámú jármű adatai!`,
        );
      },
      error: (err: HttpErrorResponse) => {
        const response: ApiResponse<undefined> = err.error;
        this._error.set(response.message);
        this.clearVehicle();
        this.clearMessage();
      },
    });
  }

  getAllVehicles(): void {
    this.apiService.getAllVehicles().subscribe({
      next: (response: ApiResponse<UpdateVehicle[]>) => {
        this._vehicleList.set(response.data!);
        this._message.set(response.message);
        this.clearError();
      },
      error: (err: HttpErrorResponse) => {
        const response: ApiResponse<undefined> = err.error;
        this._error.set(response.message);
        this.clearVehicleList();
      },
    });
  }

  getVehicleById(id: number): void {
    this.apiService.getVehicleById(id).subscribe({
      next: (response: ApiResponse<UpdateVehicle>) => {
        this._vehicle.set(response.data!);
        this._message.set(response.message);
        this.clearError();
      },
      error: (err: HttpErrorResponse) => {
        const response: ApiResponse<undefined> = err.error;
        this._error.set(response.message);
        this.clearVehicle();
        this.clearMessage();
      },
    });
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SuccessSnackbar, {
      duration: this._snackBarDurationMs(),
      data: message,
    });
  }
}
