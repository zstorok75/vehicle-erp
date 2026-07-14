import { Routes } from '@angular/router';
export const VEHICLE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/vehicle-list/vehicle-list').then((m) => m.VehicleList),
    title: 'Járművek - AutoManager',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/vehicle-form/vehicle-form').then((m) => m.VehicleForm),
    title: 'Új jármű felvétele',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/vehicle-form/vehicle-form').then((m) => m.VehicleForm),
    title: 'Jármű részletei',
  },
];
