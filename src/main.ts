import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideHttpClient} from "@angular/common/http";
import {provideMatModules} from "./app/material.providers";
import {provideAnimations} from "@angular/platform-browser/animations";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    ...provideMatModules(),
    ...appConfig.providers
  ]
}).catch(err => console.error(err));
