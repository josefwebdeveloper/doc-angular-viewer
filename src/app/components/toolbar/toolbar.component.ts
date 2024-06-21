import {Component, Output, EventEmitter, Input, input, output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbar],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  documentName = input<string>();
  zoomLevel = input<number>();
  zoomIn = output<void>();
  zoomOut = output<void>();
  saveAnnotations = output<void>();


}
