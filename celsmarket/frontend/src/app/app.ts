import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./reusable/footer-component/footer-component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FooterComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'celsmarket';
}
