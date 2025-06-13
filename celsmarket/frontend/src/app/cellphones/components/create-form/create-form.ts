import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Cellphone } from '../../models/cellphone';
import { SecondaryEntityService } from '../../services/seconday-entity-service';
import { CellphoneService } from '../../services/cellphone-service';
import { AddSecondaryComponent } from "../add-secondary-component/add-secondary-component";
import { SelectSecondaryComponent } from "../select-secondary-component/select-secondary-component";
import { NavComponent } from "../../../nav/components/nav-component/nav-component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-form',
  imports: [CommonModule, FormsModule, AddSecondaryComponent, SelectSecondaryComponent, RouterModule],
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
        console.log("UPDATEADO " + JSON.stringify(this.cellphone))
        return;
      }
      console.log('QUE PASO ' + form.valid)
      this.cellphoneService.create(this.cellphone);
      form.resetForm();
    }
  }

  deleteSecondary(value: number, url: string) {
    return this.secondaryService.remove(value, url);
  }
  
}
