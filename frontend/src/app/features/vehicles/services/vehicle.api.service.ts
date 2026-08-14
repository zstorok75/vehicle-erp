import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { NewVehicle } from '../models/newVehicle.interface';
import { UpdateVehicle } from '../models/updateVehicle.interface';
import { Observable } from 'rxjs';

@Service()
export class VehicleApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/vehicles';

  saveVehicle(newVehicle: NewVehicle): Observable<UpdateVehicle> {
    return this.http.post<UpdateVehicle>(this.apiUrl, newVehicle);
  }

  updateVehicle(id: number, updatedVehicle: UpdateVehicle): Observable<UpdateVehicle> {
    return this.http.patch<UpdateVehicle>(`${this.apiUrl}/${id}`, updatedVehicle);
  }

  getAllVehicles(): Observable<UpdateVehicle[]> {
    return this.http.get<UpdateVehicle[]>(this.apiUrl);
  }

  getVehicleById(id: number): Observable<UpdateVehicle> {
    return this.http.get<UpdateVehicle>(`${this.apiUrl}/${id}`);
  }
}
