import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DocumentService } from '../../services/document.service';
import { AnnotationService } from '../../services/annotation.service';
import { DocumentData } from "../../models/documents";
import {AnnotationComponent} from "../../components/annotation/annotation.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  templateUrl: './document-viewer.component.html',
  imports: [
    AnnotationComponent,
    NgIf
  ],
  styleUrls: ['./document-viewer.component.scss'],
})
export class DocumentViewerComponent implements OnInit {
  document!: DocumentData;
  zoomLevel: number = 100;

  private route = inject(ActivatedRoute);
  private documentService = inject(DocumentService);
  private annotationService = inject(AnnotationService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.documentService.getDocument(id).subscribe(data => {
        this.document = data;
      });
    }
  }

  zoomIn(): void {
    this.zoomLevel += 10;
  }

  zoomOut(): void {
    this.zoomLevel -= 10;
  }

  saveAnnotations(): void {
    console.log('Annotations saved:', { document: this.document, annotations: this.annotationService.getAnnotations() });
  }

  onFileSelected(event: any, pageIndex: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        this.addImageAnnotation(imageUrl, pageIndex);
      };
      reader.readAsDataURL(file);
    }
  }

  addImageAnnotation(imageUrl: string, pageIndex: number): void {
    this.annotationService.addAnnotation({ type: 'image', imageUrl, x: 50, y: 50, pageIndex });
  }
}
