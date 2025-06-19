import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./reusable/footer-component/footer-component";
import { NavComponent } from "./nav/components/nav-component/nav-component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FooterComponent,
    NavComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'celsmarket';
}
