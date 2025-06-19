import { Component, inject } from '@angular/core';
import { Cellphone } from '../../../cellphones/models/cellphone';
import { CellphoneService } from '../../../cellphones/services/cellphone-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WppButtonComponent } from '../wpp-button-component/wpp-button-component';
import { NavComponent } from '../../../nav/components/nav-component/nav-component';
import { Specifications } from '../specifications/specifications';
import { LoadingComponent } from '../../../reusable/loading-component/loading-component';
import { Shipments } from '../shipments/shipments';
import { Payments } from '../payments/payments';

@Component({
  selector: 'app-view-details-component',
  imports: [
    CommonModule,
    WppButtonComponent,
    NavComponent,
    Specifications,
    LoadingComponent,
    Shipments,
    Payments,
    RouterModule
  ],
  templateUrl: './view-details-component.html',
  standalone: true,
})
export class ViewDetailsComponent {
  loading: boolean = true;
  cellphone: Cellphone = new Cellphone();

  constructor(private route: ActivatedRoute) {}

  private cellphoneService = inject(CellphoneService);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        await this.loadCellphone(parseInt(id));
      } catch (err) {
        console.error('Error en ngOnInit:', err);
      } finally {
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  }

  async loadCellphone(id: number): Promise<void> {
    this.cellphone = await this.cellphoneService.findByIdAvailable(id);
  }
}
