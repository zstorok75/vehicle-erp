import { Component, effect, inject, Signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.interface';

@Component({
  selector: 'app-vehicle-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
  ],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.scss',
})
export class VehicleForm {
  private fb = inject(FormBuilder);
  private vehicleService = inject(VehicleService);
  maxYear = new Date().getFullYear();

  vehicleForm = this.fb.group(this.initVehicleForm());
  error: Signal<string[]> = this.vehicleService.error;
  selectedVehicle: Signal<Vehicle | null> = this.vehicleService.createdVehicle;

  constructor() {
    effect(() => {
      const _hasError = this.error();
      if (_hasError) {
        console.log(`A következő hibákat találtuk: ${_hasError}`);
      }
    });
    effect(() => {
      const _hasVehicle = this.selectedVehicle();
      if (_hasVehicle) {
        console.log(_hasVehicle);
      }
    });
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      console.log('🚀 Beküldésre kész adatok:', this.vehicleForm.value);
      const newVehicle: Vehicle = this.mapFormDataToVehicle(this.vehicleForm.value);
      this.vehicleService.saveVehicle(newVehicle);
    } else {
      console.log(`❌ Az űrlap érvénytelen, javítsd a hibákat! ${this.error()}`);
    }
  }

  resetForm(): void {
    this.vehicleForm.reset();
    this.vehicleForm.updateValueAndValidity();
  }

  private mapFormDataToVehicle(data: any): Vehicle {
    const vehicle: Vehicle = {
      vin: data.vin,
      brand: data.brand,
      model: data.model,
      productionYear: Number(data.productionYear),
    };
    return vehicle;
  }

  private initVehicleForm(): Record<string, any> {
    return {
      id: [''],
      licensePlate: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      vin: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      productionYear: ['', Validators.required],
      createdAt: [''],
    };
  }
}
