import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class VehicleService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/vehicles';

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
