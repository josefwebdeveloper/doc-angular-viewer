import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CdkDrag, CdkDragEnd, DragDropModule} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-annotation',
  standalone: true,
  imports: [CommonModule, DragDropModule,CdkDrag],
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss']
})
export class AnnotationComponent implements OnInit {
  @Input() document: any;
  @Input() zoomLevel: number = 100;
  @Output() annotationsChange = new EventEmitter<{ text: string, x: number, y: number, pageIndex: number }[]>();

  annotations: { text: string, x: number, y: number, pageIndex: number }[] = [];
  pageDimensions: { width: number, height: number }[] = [];

  ngOnInit(): void {
    this.calculatePageDimensions();
  }

  calculatePageDimensions(): void {
    this.pageDimensions = this.document.pages.map(() => {
      return { width: 0, height: 0 };
    });
  }

  onPageLoad(event: Event, index: number): void {
    const img = event.target as HTMLImageElement;
    this.pageDimensions[index] = { width: img.naturalWidth, height: img.naturalHeight };
  }

  addAnnotation(event: MouseEvent, pageIndex: number): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const text = prompt('Enter annotation text:');
    if (text) {
      this.annotations.push({ text, x, y, pageIndex });
      this.annotationsChange.emit(this.annotations);
    }
  }

  removeAnnotation(index: number): void {
    this.annotations.splice(index, 1);
    this.annotationsChange.emit(this.annotations);
  }

  onDragEnd(event: CdkDragEnd, index: number): void {
    // const element: HTMLElement = event.source.element.nativeElement;
    // const parentElement = element.parentElement as HTMLElement;
    // const parentRect = parentElement.getBoundingClientRect();
    // const elementRect = element.getBoundingClientRect();
    //
    // const x = ((elementRect.left - parentRect.left) / parentRect.width) * 100;
    // const y = ((elementRect.top - parentRect.top) / parentRect.height) * 100;
    console.log(this.annotations);
    // this.annotations[index].x = x;
    // this.annotations[index].y = y;
    this.annotationsChange.emit(this.annotations);
  }

  getAnnotationsForPage(pageIndex: number) {
    return this.annotations.filter(a => a.pageIndex === pageIndex);
  }
}
