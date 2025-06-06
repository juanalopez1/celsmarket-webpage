import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Secondary } from '../../models/secondary-entity';
import { SecondaryEntityService } from '../../services/seconday-entity-service';

@Component({
  selector: 'app-color-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './color-component.html',
})
export class ColorComponent {
  colors = signal<Secondary[]>([]);
  constructor(private service: SecondaryEntityService) {}

  async ngOnInit() {
    await this.loadColors();
  }

  async loadColors() {
    try {
      const colors = await this.service.findAll('colors');
      this.colors.set(colors);
    } catch (err) {
      console.error('Error cargando las marcas:', err);
    }
  }

  async addColor(newColor: string) {
    try {
      const created = await this.service.create({ name: newColor }, 'colors');
      this.colors.update((colors) => [...colors, created]);
    } catch (err) {
      console.error('Error creando color:', err);
    }
  }

  async deleteColor(id: number) {
    try {
      await this.service.remove(id, 'colors');
      this.colors.update((colors) => colors.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Error eliminando color:', err);
    }
  }
}
