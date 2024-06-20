import { Routes } from '@angular/router';
import {DocumentViewerComponent} from "./document-viewer/document-viewer.component";

export const routes: Routes = [
  { path: 'viewer/view/:id', component: DocumentViewerComponent },
  { path: '', redirectTo: 'viewer/view/1', pathMatch: 'full' },
  { path: '**', redirectTo: 'viewer/view/1' }
];
