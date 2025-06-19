import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cellphone } from '../../../cellphones/models/cellphone';
import { CellphoneService } from '../../../cellphones/services/cellphone-service';

@Component({
  selector: 'app-specifications',
  imports: [],
  templateUrl: './specifications.html',
  styles: ``,
})
export class Specifications {
  constructor(private route: ActivatedRoute) {}
  cellphone: Cellphone = new Cellphone();

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCellphone(parseInt(id)).then();
    }
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
