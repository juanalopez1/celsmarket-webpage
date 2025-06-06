import { Component, inject, Input, OnInit } from '@angular/core';
import { Secondary } from '../../models/secondary-entity';
import { SecondaryEntityService } from '../../services/seconday-entity-service';
import { StorageService } from '../../services/storage-service';

@Component({
  selector: 'app-select-secondary-component',
  templateUrl: './select-secondary-component.html',
  imports: [],
  standalone: true
})
export class SelectSecondaryComponent implements OnInit {
  @Input() componentFor: string = '';

  loading: boolean = true;
  private secondaryService = inject(SecondaryEntityService);
  private storageService = inject(StorageService);

  brands: Secondary[] = [];
  colors: Secondary[] = [];
  conditions: Secondary[] = [];
  models: Secondary[] = [];
  storages: Secondary[] = [];

  ngOnInit(): void {
    this.secondaryService.findAll('brands').then((b) => (this.brands = b));
    this.secondaryService.findAll('colors').then((c) => (this.colors = c));
    this.secondaryService
      .findAll('conditions')
      .then((c) => (this.conditions = c));
    this.secondaryService.findAll('models').then((m) => (this.models = m));
    this.storageService.findAll().then((data) => (this.storages = data));
    this.loading = false;
  }

  returnList(): Secondary[] {
    switch (this.componentFor) {
      case 'Marca':
        return this.brands;

      case 'Modelo':
        return this.models;

      case 'Color':
        return this.colors;

      case 'Condición':
        return this.conditions;

      case 'Almacenamiento':
        return this.storages;

      default:
        return []; // o null, o throw error, dependiendo de tu lógica
    }
  }

  isStorageList(): boolean {
    return this.componentFor === 'Almacenamiento';
  }
}
