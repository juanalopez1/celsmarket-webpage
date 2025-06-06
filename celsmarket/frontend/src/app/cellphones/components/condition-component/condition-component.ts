import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Secondary } from '../../models/secondary-entity';
import { SecondaryEntityService } from '../../services/seconday-entity-service';

@Component({
  selector: 'app-condition-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './condition-component.html',
})
export class ConditionComponent {
  conditions = signal<Secondary[]>([]);
  constructor(private service: SecondaryEntityService) {}

  async ngOnInit() {
    await this.loadConditions();
  }

  async loadConditions() {
    try {
      const conditions = await this.service.findAll('conditions');
      this.conditions.set(conditions);
    } catch (err) {
      console.error('Error cargando las condiciones:', err);
    }
  }

  async addCondition(newCondition: string) {
    try {
      
      const created = await this.service.create(
        { name: newCondition },
        'conditions'
      );
      this.conditions.update((conditions) => [...conditions, created]);
    } catch (err) {
      console.error('Error creando condition:', err);
    }
  }

  async deleteCondition(id: number) {
    try {
      await this.service.remove(id, 'conditions');
      this.conditions.update((conditions) =>
        conditions.filter((c) => c.id !== id)
      );
    } catch (err) {
      console.error('Error eliminando condicion:', err);
    }
  }
}
