import { Routes } from '@angular/router';
import {DocumentViewerComponent} from "./pages/document-viewer/document-viewer.component";
import {HomeComponent} from "./pages/home/home.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'viewer/view/:id', component: DocumentViewerComponent },
  { path: '**', redirectTo: '' }
];
