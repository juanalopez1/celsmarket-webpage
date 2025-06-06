import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { StorageService } from '../../services/storage-service';
import { Storage } from '../../models/storage';
import { Secondary } from '../../models/secondary-entity';

@Component({
  selector: 'app-storage-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './storage-component.html',
})
export class StorageComponent {
  storages = signal<Secondary[]>([]);

  constructor(private service: StorageService) {}

  async ngOnInit() {
    await this.loadStorages();
  }

  async loadStorages() {
    try {
      const storages = await this.service.findAll();
      this.storages.set(storages);
    } catch (err) {
      console.error('Error cargando los almacenamientos:', err);
    }
  }

  async addStorage(newStorageNumber: number, newStorageUnit: string) {
    try {
      const created = await this.service.create({
        number: newStorageNumber,
        unit: newStorageUnit,
      });

      const transformed: Secondary = {
        id: created.id,
        name: `${created.number} ${created.unit}`,
      };

      this.storages.update((storages) => [...storages, transformed]);
    } catch (err) {
      console.error('Error creando almacenamiento:', err);
    }
  }

  async deleteStorage(id: number) {
    try {
      await this.service.remove(id);
      this.storages.update((storages) => storages.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Error eliminando almacenamiento:', err);
    }
  }
}
