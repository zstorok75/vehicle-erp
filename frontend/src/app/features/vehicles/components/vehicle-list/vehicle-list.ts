import { Component, effect, inject, OnInit, Signal, viewChild } from '@angular/core';
import { VehicleStoreService } from '../../services/vehicle.store.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { UpdateVehicle } from '../../models/updateVehicle.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialog } from '../../../../core/layout/error-dialog/error-dialog';

@Component({
  selector: 'app-vehicle-list',
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.scss',
})
export class VehicleList implements OnInit {
  private vehicleService = inject(VehicleStoreService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private sort = viewChild(MatSort);
  tableData: MatTableDataSource<UpdateVehicle> = new MatTableDataSource<UpdateVehicle>();
  listElements: Signal<UpdateVehicle[] | null> = this.vehicleService.vehicleList;
  displayedColumns: string[] = ['index', 'brand', 'model', 'vin', 'licensePlate', 'productionYear'];
  error: Signal<string[] | string | null> = this.vehicleService.error;

  constructor() {
    effect(() => {
      const data = this.listElements();
      if (data) {
        this.tableData.data = data;
      }
    });
    effect(() => {
      const sortInstance = this.sort(); // A viewChild signalt ad vissza
      if (sortInstance) {
        this.tableData.sort = sortInstance;
      }
    });
    effect(() => {
      const _error = this.error();
      if (_error && _error.length > 0) {
        const dialogRef = this.dialog.open(ErrorDialog, { data: _error, hasBackdrop: false });
        dialogRef.afterClosed().subscribe(() => {
          this.vehicleService.clearError();
        });
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
    this.tableData.filter = filteredList.trim().toLowerCase();
  }
}
