import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [CommonModule, MatCardModule, RouterModule, ToolbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private router = inject(Router);
  name = 'Document Viewer';

  openDocument(): void {
    this.router.navigate(['/viewer/view/1']);
  }
}
