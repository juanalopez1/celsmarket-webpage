import { Component, signal } from '@angular/core';
import { SaleService } from '../../services/sale-service';
import { Sale } from '../../models/sale';
import { DetailsComponent } from "../details-component/details-component";
import { RouterModule } from '@angular/router';
import { NavComponent } from "../../../nav/components/nav-component/nav-component";

@Component({
  selector: 'app-sales-history-component',
  imports: [DetailsComponent, RouterModule],
  templateUrl: './sales-history-component.html',
  styles: ``,
  standalone: true,
})
export class SalesHistoryComponent {
  sales = signal<Sale[]>([]);

  constructor(private service: SaleService) {}

  async ngOnInit() {
    await this.loadSales();
  }

  async loadSales() {
    try {
      const result = await this.service.getAll();
      this.sales.set(result);
    } catch (err) {
      console.error('Error cargando las ventas:', err);
    }
  }

  /*async onRemovecellphone(id: number) {
    await this.service.remove(id);
    this.cellphones.update((cellphones) =>
      cellphones.filter((c) => c.id !== id)
    );
  }*/
}
