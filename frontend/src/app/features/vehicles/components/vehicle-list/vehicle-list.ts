import { Component, effect, inject, OnInit, viewChild } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { UpdateVehicle } from '../../models/updateVehicle.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.scss',
})
export class VehicleList implements OnInit {
  private vehicleService = inject(VehicleService);
  private router = inject(Router);
  private sort = viewChild(MatSort);
  listData = new MatTableDataSource<UpdateVehicle>();
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

  selectVehicle(id: number) {
    this.router.navigate(['/vehicles', id]);
  }

  applyFilter(event: Event) {
    const filteredList = (event.target as HTMLInputElement).value;
    this.listData.filter = filteredList.trim().toLowerCase();
  }
}
