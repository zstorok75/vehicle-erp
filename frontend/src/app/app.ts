import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehicleList } from './features/vehicles/components/vehicle-list/vehicle-list';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet, VehicleList],
  imports: [VehicleList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend');
}
