import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Secondary } from '../../models/secondary-entity';
import { SecondaryEntityService } from '../../services/seconday-entity-service';

@Component({
  selector: 'app-model-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './model-component.html',
})
export class ModelComponent {
  models = signal<Secondary[]>([]);

  constructor(private service: SecondaryEntityService) {}

  async ngOnInit() {
    await this.loadModels();
  }

  async loadModels() {
    try {
      const models = await this.service.findAll('models');
      this.models.set(models);
    } catch (err) {
      console.error('Error cargando las condiciones:', err);
    }
  }

  async addModel(newModel: string) {
    try {
      const created = await this.service.create(
        { name: newModel },
        'models'
      );
      this.models.update((models) => [...models, created]);
    } catch (err) {
      console.error('Error creando modelo:', err);
    }
  }

  async deleteModel(id: number) {
    try {
      await this.service.remove(id, 'models');
      this.models.update((models) =>
        models.filter((m) => m.id !== id)
      );
    } catch (err) {
      console.error('Error eliminando modelo:', err);
    }
  }
}
