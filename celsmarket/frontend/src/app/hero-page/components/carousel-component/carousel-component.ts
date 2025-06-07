import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel-component',
  imports: [],
  templateUrl: './carousel-component.html',
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('carousel') carouselRef!: ElementRef<HTMLDivElement>;

  private currentIndex = 0;
  private intervalId: any;

  ngAfterViewInit(): void {
    const items = this.carouselRef.nativeElement.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % totalItems;

      const scrollY = items[this.currentIndex].clientHeight * this.currentIndex;

      this.carouselRef.nativeElement.scrollTo({
        top: scrollY,
        behavior: 'smooth'
      });
    }, 2000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}