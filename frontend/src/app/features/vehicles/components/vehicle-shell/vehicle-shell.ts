import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vehicle-shell',
  imports: [MatButtonModule, MatIconModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './vehicle-shell.html',
  host: { class: 'flex-1 flex flex-col min-h-0' },
  styleUrl: './vehicle-shell.scss',
})
export class VehicleShell {}
