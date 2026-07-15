import { Routes } from '@angular/router';
export const VEHICLE_ROUTES: Routes = [
  {
    path: '',
    title: 'Járművek - AutoManager',
    loadComponent: () =>
      import('./components/vehicle-shell/vehicle-shell').then((m) => m.VehicleShell),
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./components/vehicle-list/vehicle-list').then((m) => m.VehicleList),
        title: 'Járművek',
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./components/vehicle-form/vehicle-form').then((m) => m.VehicleForm),
        title: 'Új jármű rögzítése',
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./components/vehicle-form/vehicle-form').then((m) => m.VehicleForm),
        title: 'Jármű részletei',
      },
    ],
  },
];
