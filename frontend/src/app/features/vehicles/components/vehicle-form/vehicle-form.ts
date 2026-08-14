import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { VehicleStoreService } from '../../services/vehicle.store.service';
import { NewVehicle } from '../../models/newVehicle.interface';
import { UpdateVehicle } from '../../models/updateVehicle.interface';
import { ActivatedRoute } from '@angular/router';
import { UppercaseDirective } from '../../../../shared/directives/uppercase';

@Component({
  selector: 'app-vehicle-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    UppercaseDirective,
  ],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.scss',
})
export class VehicleForm implements OnInit {
  private fb = inject(FormBuilder);
  private vehicleService = inject(VehicleStoreService);
  private activatedRoute = inject(ActivatedRoute);

  error: Signal<string[] | null> = this.vehicleService.error;
  vehicle: Signal<UpdateVehicle | null> = this.vehicleService.vehicle;

  vehicleForm = this.fb.group(this.initVehicleForm());
  maxYear = new Date().getFullYear() + 1;

  constructor() {
    effect(() => {
      const _hasVehicle = this.vehicle();
      if (_hasVehicle) {
        this.setDataToForm(_hasVehicle);
      }
    });
  }

  ngOnInit(): void {
    const vehicleId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (vehicleId) {
      this.vehicleService.getVehicleById(vehicleId);
    }
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      console.log('🚀 Beküldésre kész adatok:', this.vehicleForm.value);
      if (this.vehicleForm.get('id')?.value == '') {
        const newVehicle: NewVehicle = this.mapFormDataToVehicle(
          this.vehicleForm.value,
        ) as NewVehicle;
        this.vehicleService.saveVehicle(newVehicle);
      } else {
        const updatedVehicle: UpdateVehicle = this.mapFormDataToVehicle(
          this.vehicleForm.value,
        ) as UpdateVehicle;
        this.vehicleService.updateVehicle(updatedVehicle);
      }
    } else {
      console.log(`❌ Az űrlap érvénytelen, javítsd a hibákat! ${this.error()}`);
    }
  }

  setDataToForm(data: UpdateVehicle): void {
    this.vehicleForm.setValue(data);
  }

  resetForm(): void {
    this.vehicleForm.reset();
    this.vehicleForm.updateValueAndValidity();
  }

  private mapFormDataToVehicle(data: any): NewVehicle | UpdateVehicle {
    if (data.id && data.createdAt) {
      const updatedVehicle: UpdateVehicle = {
        id: Number(data.id!),
        vin: data.vin,
        brand: data.brand,
        model: data.model,
        productionYear: data.productionYear,
        createdAt: data.createdAt!,
      };
      if (data.licensePlate) {
        updatedVehicle.licensePlate = data.licensePlate;
      }
      return updatedVehicle;
    } else if (!data.id && !data.createdAt) {
      const newVehicle: NewVehicle = {
        vin: data.vin,
        brand: data.brand,
        model: data.model,
        productionYear: Number(data.productionYear),
      };
      if (data.licensePlate) {
        newVehicle.licensePlate = data.licensePlate;
      }
      return newVehicle;
    } else {
      throw new Error('Vehicle form: Nem lehet az adatokat konvertálni');
    }
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
