import { Component, inject, signal } from '@angular/core';
import { Cellphone } from '../../../cellphones/models/cellphone';
import { CellphoneService } from '../../../cellphones/services/cellphone-service';
import { RouterModule } from '@angular/router';
import { LogService } from '../../../auth/services/log-service';
import { NavComponent } from "../../../nav/components/nav-component/nav-component";

@Component({
  selector: 'app-public-inventory-component',
  imports: [RouterModule, NavComponent],
  standalone: true,
  templateUrl: './public-inventory-component.html',
})
export class PublicInventoryComponent {
  cellphones = signal<Cellphone[]>([]);

  constructor(private service: CellphoneService) {}

  async ngOnInit() {
    await this.loadCellphones();
  }

  async loadCellphones() {
    try {
      const result = await this.service.findAvailables();
      this.cellphones.set(result);
    } catch (err) {
      console.error('Error cargando los productos:', err);
    }
  }
}
