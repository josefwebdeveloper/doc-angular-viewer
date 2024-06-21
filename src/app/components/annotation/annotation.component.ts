import {Component, Input, OnInit, inject, input} from '@angular/core';
import {CdkDrag, CdkDragEnd, DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {AnnotationService} from '../../services/annotation.service';
import {Annotation} from "../../models/annotation";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AnnotationDialogComponent} from '../annotation-dialog/annotation-dialog.component';
import {v4 as uuidv4} from 'uuid';
import {DocumentData} from "../../models/documents";

@Component({
  selector: 'app-annotation',
  standalone: true,
  imports: [CommonModule, DragDropModule, CdkDrag, MatDialogModule],
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
})
export class AnnotationComponent implements OnInit {
  document = input<DocumentData>();
  zoomLevel = input<number>(100);
  annotations: Annotation[] = [];
  pageDimensions: { width: number; height: number }[] | undefined = [];

  private annotationService = inject(AnnotationService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.annotationService.annotations$.subscribe(annotations => {
      this.annotations = annotations;
    });
    this.calculatePageDimensions();
  }

  calculatePageDimensions(): void {
    this.pageDimensions = this.document()?.pages.map(() => {
      return {width: 0, height: 0};
    });
  }

  onPageLoad(event: Event, index: number): void {
    const img = event.target as HTMLImageElement;
    if (this.pageDimensions !== undefined) {
      this.pageDimensions[index] = {width: img.naturalWidth, height: img.naturalHeight};
    }
  }

  addTextAnnotation(event: MouseEvent, pageIndex: number): void {
    const dialogRef = this.dialog.open(AnnotationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'text') {
        this.addTextAnnotationContent(event, pageIndex);
      } else if (result === 'image') {
        this.addImageAnnotationContent(event, pageIndex);
      }
    });
  }

  addTextAnnotationContent(event: MouseEvent, pageIndex: number): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const text = prompt('Enter annotation text:');
    if (text) {
      this.annotationService.addAnnotation({id: uuidv4(), type: 'text', text, x, y, pageIndex});
    }
  }

  addImageAnnotationContent(event: MouseEvent, pageIndex: number): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const imageUrl = e.target.result;
          this.annotationService.addAnnotation({id: uuidv4(), type: 'image', imageUrl, x, y, pageIndex});
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  }

  removeAnnotation(id: string): void {
    this.annotationService.removeAnnotation(id);
  }

  onDragEnd(event: CdkDragEnd, id: string): void {
    const element: HTMLElement = event.source.element.nativeElement;
    const parentElement = element.parentElement as HTMLElement;
    const parentRect = parentElement.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const x = ((elementRect.left - parentRect.left) / parentRect.width) * 100;
    const y = ((elementRect.top - parentRect.top) / parentRect.height) * 100;

    const annotation = this.annotations.find(a => a.id === id);
    if (annotation) {
      this.annotationService.updateAnnotation(id, {...annotation, x, y});
    }
  }

  getAnnotationsForPage(pageIndex: number) {
    return this.annotations.filter(a => a.pageIndex === pageIndex);
  }
}
