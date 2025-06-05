import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Cellphone } from '../../models/cellphone';
import { EventEmitter } from 'stream';
import { SecondaryEntityService } from '../../services/seconday-entity-service';
import { Secondary } from '../../models/secondary-entity';
import { Storage } from '../../models/storage';
import { StorageService } from '../../services/storage-service';
import { CellphoneService } from '../../services/cellphone-service';

@Component({
  selector: 'app-create-form',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './create-form.html',
})
export class CreateForm implements OnInit {
  private secondaryService = inject(SecondaryEntityService);
  private storageService = inject(StorageService);
  private cellphoneService = inject(CellphoneService);

  brands: Secondary[] = [];
  colors: Secondary[] = [];
  conditions: Secondary[] = [];
  models: Secondary[] = [];
  storages: Storage[] = [];

  ngOnInit(): void {
    this.secondaryService.findAll('brands').then((b) => (this.brands = b));
    this.secondaryService.findAll('colors').then((c) => (this.colors = c));
    this.secondaryService
      .findAll('conditions')
      .then((c) => (this.conditions = c));
    this.secondaryService.findAll('models').then((m) => (this.models = m));
    this.storageService.findAll().then((data) => (this.storages = data));
  }

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

}
