import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-annotation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './annotation-dialog.component.html',
  styleUrls: ['./annotation-dialog.component.scss']
})
export class AnnotationDialogComponent {

  constructor(public dialogRef: MatDialogRef<AnnotationDialogComponent>) {}

  addText() {
    this.dialogRef.close('text');
  }

  addImage() {
    this.dialogRef.close('image');
  }
}
