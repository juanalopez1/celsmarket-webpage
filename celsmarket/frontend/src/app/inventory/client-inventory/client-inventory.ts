import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cellphone } from '../../cellphones/models/cellphone';
import { CellphoneService } from '../../cellphones/services/cellphone-service';

@Component({
  selector: 'app-public-inventory-component',
  imports: [RouterModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './client-inventory.html',
})
export class ClientInventory {
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
