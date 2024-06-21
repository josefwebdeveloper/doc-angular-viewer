import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonModule} from '@angular/common';

import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {AnnotationComponent} from "../../components/annotation/annotation.component";
import {DocumentData} from "../../models/documents";
import {DocumentService} from "../../services/document.service";
import {AnnotationService} from "../../services/annotation.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [CommonModule, AnnotationComponent, ToolbarComponent, ToolbarComponent, MatProgressSpinner],
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit, OnDestroy {
  document!: DocumentData;
  zoomLevel: number = 100;
  subscription = new Subscription();
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
    if (this.zoomLevel === 10) {
      return
    }
    this.zoomLevel -= 10;
  }

  saveAnnotations(): void {
    console.log('Annotations saved:', {document: this.document, annotations: this.annotationService.getAnnotations()});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
