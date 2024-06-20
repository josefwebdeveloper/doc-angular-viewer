import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AnnotationComponent} from "../annotation/annotation.component";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {DocumentData} from "../models/documents";


@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [
    AnnotationComponent,
    NgForOf,
    NgStyle,
    NgIf
  ],
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss'
})
export class DocumentViewerComponent implements OnInit {
  document!: DocumentData;
  zoomLevel: number = 100;
  annotations: { text: string, x: number, y: number, pageIndex: number }[] = [];
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<DocumentData>(`/assets/documents/${id}.json`).subscribe(data => {
      this.document = data;
    });
  }

  zoomIn(): void {
    this.zoomLevel += 10;
  }

  zoomOut(): void {
    this.zoomLevel -= 10;
  }

  saveAnnotations(): void {
    console.log('Annotations saved:', { document: this.document, annotations: this.annotations });
  }

  onAnnotationsChange(newAnnotations: { text: string, x: number, y: number, pageIndex: number }[]): void {
    this.annotations = newAnnotations;
  }
}
