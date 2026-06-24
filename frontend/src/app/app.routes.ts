import { Routes } from '@angular/router';
import { VehicleForm } from './features/vehicles/components/vehicle-form/vehicle-form';
import { VehicleList } from './features/vehicles/components/vehicle-list/vehicle-list';

export const routes: Routes = [
  // { path: 'vehicle-form', component: VehicleForm },
  // { path: 'vehicle-list', component: VehicleList },
  { path: '**', component: VehicleForm },
];
