import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { NewVehicle } from '../models/newVehicle.interface';
import { UpdateVehicle } from '../models/updateVehicle.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response.interface';

@Service()
export class VehicleApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/vehicles';

  saveVehicle(newVehicle: NewVehicle): Observable<ApiResponse<UpdateVehicle>> {
    return this.http.post<ApiResponse<UpdateVehicle>>(this.apiUrl, newVehicle);
  }

  updateVehicle(id: number, updatedVehicle: UpdateVehicle): Observable<ApiResponse<UpdateVehicle>> {
    return this.http.patch<ApiResponse<UpdateVehicle>>(`${this.apiUrl}/${id}`, updatedVehicle);
  }

  getAllVehicles(): Observable<ApiResponse<UpdateVehicle[]>> {
    return this.http.get<ApiResponse<UpdateVehicle[]>>(this.apiUrl);
  }

  getVehicleById(id: number): Observable<ApiResponse<UpdateVehicle>> {
    return this.http.get<ApiResponse<UpdateVehicle>>(`${this.apiUrl}/${id}`);
  }
}
