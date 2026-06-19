import { Component, inject } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-vehicle-list',
  imports: [],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.scss',
})
export class VehicleList {
  private vehicleService = inject(VehicleService);

  public vehicles = toSignal(this.vehicleService.getVehicles(), { initialValue: [] });
}
