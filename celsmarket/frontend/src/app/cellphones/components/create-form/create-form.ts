import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Cellphone } from '../../models/cellphone';
import { SecondaryEntityService } from '../../services/seconday-entity-service';
import { Secondary } from '../../models/secondary-entity';
import { Storage } from '../../models/storage';
import { StorageService } from '../../services/storage-service';
import { CellphoneService } from '../../services/cellphone-service';
import { BrandComponent } from '../brand-component/brand-component';
import { AddSecondaryComponent } from "../add-secondary-component/add-secondary-component";
import { SelectSecondaryComponent } from "../select-secondary-component/select-secondary-component";

@Component({
  selector: 'app-create-form',
  imports: [CommonModule, FormsModule, AddSecondaryComponent, SelectSecondaryComponent],
  standalone: true,
  templateUrl: './create-form.html',
})
export class CreateForm {
  private secondaryService = inject(SecondaryEntityService);
  private cellphoneService = inject(CellphoneService);


  @Input() cellphone: Cellphone = {
    id: 0,
    stock: 0,
    price: 0,
    batteryCondition: 0,
    description: '',
    storage: { id: 0, number: 0, unit: '' },
    model: { id: 0, name: '' },
    color: { id: 0, name: '' },
    condition: { id: 0, name: '' },
    brand: { id: 0, name: '' },
    shown: false,
    sold: false,
  };

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.cellphone.id > 0) {
        this.cellphoneService.update(this.cellphone);
        return;
      }
      this.cellphoneService.create(this.cellphone);
      form.resetForm();
    }
  }

  deleteSecondary(value: number, url: string) {
    return this.secondaryService.remove(value, url);
  }
}
