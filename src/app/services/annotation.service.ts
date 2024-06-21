import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Annotation } from '../models/annotation';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
  private annotationsSubject = new BehaviorSubject<Annotation[]>([]);
  annotations$ = this.annotationsSubject.asObservable();

  getAnnotations(): Annotation[] {
    return this.annotationsSubject.value;
  }

  addAnnotation(annotation: Annotation): void {
    annotation.id = this.generateUniqueId();
    const annotations = this.annotationsSubject.value;
    this.annotationsSubject.next([...annotations, annotation]);
  }

  updateAnnotation(id: string, annotation: Annotation): void {
    const annotations = this.annotationsSubject.value.map(a => a.id === id ? annotation : a);
    this.annotationsSubject.next(annotations);
  }

  removeAnnotation(id: string): void {
    const annotations = this.annotationsSubject.value.filter(a => a.id !== id);
    this.annotationsSubject.next(annotations);
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
