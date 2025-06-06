import { Component, signal } from '@angular/core';
import { Cellphone } from '../../../cellphones/models/cellphone';
import { CellphoneService } from '../../../cellphones/services/cellphone-service';

@Component({
  selector: 'app-public-inventory-component',
  imports: [],
  templateUrl: './public-inventory-component.html',
  styles: ``
})
export class PublicInventoryComponent {
  cellphones = signal<Cellphone[]>([]);


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
}
