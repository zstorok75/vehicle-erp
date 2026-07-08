import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnInit,
  signal,
  viewChild,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { UpdateVehicle } from '../../models/updateVehicle.interface';
import { Vehicle } from '../../models/vehicle.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-vehicle-list',
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.scss',
})
export class VehicleList implements OnInit {
  private vehicleService = inject(VehicleService);
  listData = new MatTableDataSource<UpdateVehicle>();
  private sort = viewChild(MatSort);
  displayedColumns: string[] = ['index', 'brand', 'model', 'vin', 'licensePlate', 'productionYear'];

  constructor() {
    effect(() => {
      this.listData.data = this.vehicleService.vehicleList();
    });
    effect(() => {
      // A viewChild a v17-től signalt ad vissza
      const sortInstance = this.sort();
      if (sortInstance) {
        this.listData.sort = sortInstance;
      }
    });
  }

  ngOnInit(): void {
    this.vehicleService.getAllVehicles();
  }

  selectVehicle(vehicle: Vehicle) {
    console.log(`Kattintottam a ${vehicle.id} járműre`);
  }

  applyFilter(event: Event) {
    const filteredList = (event.target as HTMLInputElement).value;
    this.listData.filter = filteredList.trim().toLowerCase();
  }
}
