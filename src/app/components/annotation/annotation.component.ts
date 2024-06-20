import {Component, Input, OnInit, inject, ChangeDetectionStrategy} from '@angular/core';
import { CdkDrag, CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AnnotationService } from '../../services/annotation.service';
import {Annotation} from "../../models/annotation";

@Component({
  selector: 'app-annotation',
  standalone: true,
  imports: [CommonModule, DragDropModule, CdkDrag],
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
})
export class AnnotationComponent implements OnInit {
  @Input() document: any;
  @Input() zoomLevel: number = 100;
  annotations: Annotation[] = [];
  pageDimensions: { width: number, height: number }[] = [];

  private annotationService = inject(AnnotationService);

  ngOnInit(): void {
    this.annotationService.annotations$.subscribe(annotations => {
      this.annotations = annotations;
    });
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

  addTextAnnotation(event: MouseEvent, pageIndex: number): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const text = prompt('Enter annotation text:');
    if (text) {
      this.annotationService.addAnnotation({ type: 'text', text, x, y, pageIndex });
    }
  }

  removeAnnotation(index: number): void {
    this.annotationService.removeAnnotation(index);
  }

  onDragEnd(event: CdkDragEnd, index: number): void {
    const element: HTMLElement = event.source.element.nativeElement;
    const parentElement = element.parentElement as HTMLElement;
    const parentRect = parentElement.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const x = ((elementRect.left - parentRect.left) / parentRect.width) * 100;
    const y = ((elementRect.top - parentRect.top) / parentRect.height) * 100;

    const annotation = this.annotations[index];
    this.annotationService.updateAnnotation(index, { ...annotation, x, y });
  }

  getAnnotationsForPage(pageIndex: number) {
    return this.annotations.filter(a => a.pageIndex === pageIndex);
  }
}
