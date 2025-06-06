import { Component, inject, Input, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale-service';
import { Sale } from '../../models/sale';

@Component({
  selector: 'app-details-component',
  imports: [],
  templateUrl: './details-component.html',
  styles: ``,
})
export class DetailsComponent implements OnInit {
  private saleService = inject(SaleService);
  thisSale: Sale | undefined;

  @Input() id = 0;
  async ngOnInit(): Promise<void> {
    this.thisSale = await this.saleService.getById(this.id);
  }

  showModal() {
    const modal = document.getElementById(
      'my_modal_details'
    ) as HTMLDialogElement;
    modal.showModal();
  }
}
