import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'vehicles',
    pathMatch: 'full',
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./features/vehicles/vehicle.routes').then((m) => m.VEHICLE_ROUTES),
  },
  // { path: '**', component: },
];
