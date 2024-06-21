import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-annotation-sheet',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './annotation-sheet.component.html',
  styleUrl: './annotation-sheet.component.scss'
})
export class AnnotationSheetComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}
}
