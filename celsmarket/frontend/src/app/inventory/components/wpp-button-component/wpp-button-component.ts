import { Component } from '@angular/core';

@Component({
  selector: 'app-wpp-button-component',
  imports: [],
  templateUrl: './wpp-button-component.html',
})
export class WppButtonComponent {
  telefono: string = '59891070450';

  async openWhatsApp() {
    const message = 'Hola, me gustaría obtener más información.';
    const url = `https://wa.me/${this.telefono}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, '_blank');
  }
}
