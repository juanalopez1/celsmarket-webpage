import { Component } from '@angular/core';
import { CarouselComponent } from "../carousel-component/carousel-component";

@Component({
  selector: 'app-page-component',
  imports: [CarouselComponent],
  standalone: true,
  templateUrl: './page-component.html',
  styles: ``
})
export class PageComponent {

}
