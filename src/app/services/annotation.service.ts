import { Injectable } from '@angular/core';
import {Annotation} from "../models/annotation";
import {BehaviorSubject} from "rxjs";

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
    const annotations = this.annotationsSubject.value;
    this.annotationsSubject.next([...annotations, annotation]);
  }

  updateAnnotation(index: number, annotation: Annotation): void {
    const annotations = this.annotationsSubject.value;
    annotations[index] = annotation;
    this.annotationsSubject.next([...annotations]);
  }

  removeAnnotation(index: number): void {
    const annotations = this.annotationsSubject.value;
    annotations.splice(index, 1);
    this.annotationsSubject.next([...annotations]);
  }
}
