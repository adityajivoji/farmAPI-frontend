import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { MatCardModule } from '@angular/material/card';
import { provideRouter } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'angular-frontend';
}
