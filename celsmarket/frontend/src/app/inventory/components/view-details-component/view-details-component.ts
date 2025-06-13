import { Component, inject } from '@angular/core';
import { Cellphone } from '../../../cellphones/models/cellphone';
import { CellphoneService } from '../../../cellphones/services/cellphone-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WppButtonComponent } from "../wpp-button-component/wpp-button-component";
import { NavComponent } from "../../../nav/components/nav-component/nav-component";

@Component({
  selector: 'app-view-details-component',
  imports: [CommonModule, WppButtonComponent, NavComponent],
  templateUrl: './view-details-component.html',
  standalone: true,
})
export class ViewDetailsComponent {
  loading: boolean = true;
  constructor(private route: ActivatedRoute) {}
  cellphone: Cellphone = new Cellphone();

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id);
    await this.loadCellphone(parseInt(id!));
    this.loading = false;
  }

  private cellphoneService = inject(CellphoneService);

  async loadCellphone(id: number) {
    try {
      this.cellphone = await this.cellphoneService.findByIdAvailable(id);
    } catch (err) {
      console.error('Error al obtener el celular:', err);
    }
  }
}
