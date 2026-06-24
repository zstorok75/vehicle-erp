import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-vehicle-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.scss',
})
export class VehicleForm {
  private fb = inject(FormBuilder);
  vehicleForm!: FormGroup;
  maxYear!: number;

  constructor() {
    this.vehicleForm = this.initForm();
    this.maxYear = new Date().getFullYear();
  }

  private initForm(): FormGroup {
    return this.fb.group({
      id: [''],
      licensePlate: ['', Validators.maxLength(10)],
      vin: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: [2026, [Validators.required, Validators.min(1900), Validators.max(this.maxYear)]],
    });
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      console.log('🚀 Beküldésre kész adatok:', this.vehicleForm.value);
    } else {
      console.log('❌ Az űrlap érvénytelen, javítsd a hibákat!');
    }
  }
}
