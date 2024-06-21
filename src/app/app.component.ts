import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgClass} from "@angular/common";
import {ThemeService} from "./services/theme.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-viewer';
  themeService = inject(ThemeService);
}
