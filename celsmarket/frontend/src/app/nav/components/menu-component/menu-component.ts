import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogService } from '../../../auth/services/log-service';

@Component({
  selector: 'app-menu-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu-component.html',
})
export class MenuComponent {
  
  public logService = inject(LogService);
  showLogOut : boolean = false;
  telefono: string = "59891070450";

  async openWhatsApp() {
    const message = 'Hola, me gustaría obtener más información.';
    const url = `https://wa.me/${this.telefono}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

}
