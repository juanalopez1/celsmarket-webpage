import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './reusable/footer-component/footer-component';
import { NavComponent } from './nav/components/nav-component/nav-component';
import { HlmToasterModule } from '../../libs/ui/ui-sonner-helm/src/index';
import { HlmToasterComponent } from '../../libs/ui/ui-sonner-helm/src/lib/hlm-toaster.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FooterComponent,
    NavComponent,
    HlmToasterModule,
    NavComponent,
    HlmToasterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'celsmarket';
}
