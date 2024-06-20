import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {DocumentData} from "../models/documents";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private http = inject(HttpClient);

  getDocument(id: string): Observable<DocumentData> {
    return this.http.get<DocumentData>(`/assets/documents/${id}.json`);
  }
}
