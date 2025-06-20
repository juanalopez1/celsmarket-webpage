import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  signal,
  Signal,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cellphone } from '../../cellphones/models/cellphone';
import { CellphoneService } from '../../cellphones/services/cellphone-service';
import { CreateForm } from '../../cellphones/components/create-form/create-form';

@Component({
  selector: 'app-inventory-component',
  imports: [CommonModule, RouterModule, CreateForm],
  standalone: true,
  templateUrl: './admin-inventory.html',
})
export class AdminInventory {
  cellphones = signal<Cellphone[]>([]);

  cellphoneSelected: Cellphone = new Cellphone();

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

  onEditClick(cellphone: Cellphone) {
    this.cellphoneSelected = { ...cellphone };
    this.openModal(); // se muestra el modal con el form
  }

  @ViewChild('my_modal_update') modalRef!: ElementRef<HTMLDialogElement>;
  openModal() {
    this.modalRef.nativeElement.showModal();
  }

  async markAsSold(cellphone: Cellphone) {
    this.cellphoneSelected = { ...cellphone };
    console.log(JSON.stringify(cellphone + 'EEEEEEE')  );

    this.cellphoneSelected.sold = true;

    try {
      await this.service.update(this.cellphoneSelected);
      await this.loadCellphones();
    } catch (error) {
      console.error('Error al marcar como vendido:', error);
    }
  }
}
