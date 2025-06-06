import { CommonModule } from '@angular/common';
import { Component, signal, Signal } from '@angular/core';
import { Cellphone } from '../../../cellphones/models/cellphone';
import { CellphoneService } from '../../../cellphones/services/cellphone-service';

@Component({
  selector: 'app-inventory-component',
  imports: [CommonModule],
  templateUrl: './inventory-component.html',
})
export class inventoryComponent {
  cellphones = signal<Cellphone[]>([]);

  cellphoneselected: Cellphone = new Cellphone();

  constructor(private service: CellphoneService) {}

  async ngOnInit() {
    await this.loadCellphones();
  }

  async loadCellphones() {
    try {
      const result = await this.service.findAll();
      this.cellphones.set(result);
    } catch (err) {
      console.error('Error cargando los productos:', err);
    }
  }

  async onRemovecellphone(id: number) {
    await this.service.remove(id);
    this.cellphones.update((cellphones) =>
      cellphones.filter((c) => c.id !== id)
    );
  }

  async onUpdatecellphone(cellphoneRow: Cellphone) {
    this.cellphoneselected = { ...cellphoneRow };
  }

}
