import { Component, inject, input } from '@angular/core';
import { MatSnackBarRef, MatSnackBarLabel, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-snackbar',
  imports: [MatSnackBarLabel],
  templateUrl: './success-snackbar.html',
  styleUrl: './success-snackbar.scss',
})
export class SuccessSnackbar {
  snackBarRef = inject(MatSnackBarRef);
  data = inject(MAT_SNACK_BAR_DATA);
}
