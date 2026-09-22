import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogActions,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-error-dialog',
  imports: [MatDialogTitle, MatDialogActions, MatDialogContent, MatAnchor, MatDialogClose],
  templateUrl: './error-dialog.html',
  styleUrl: './error-dialog.scss',
})
export class ErrorDialog {
  data = inject(MAT_DIALOG_DATA);
  messages: string[] = [];

  constructor() {
    if (typeof this.data === 'object') {
      this.messages = this.data;
    } else {
      this.messages.push(this.data);
    }
  }
}
