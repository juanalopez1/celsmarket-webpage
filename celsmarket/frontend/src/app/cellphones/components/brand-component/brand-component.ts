import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Secondary } from '../../models/secondary-entity';
import { SecondaryEntityService } from '../../services/seconday-entity-service';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-component.html',
})
export class BrandComponent implements OnInit {
  brands = signal<Secondary[]>([]);

  constructor(private service: SecondaryEntityService) {}

  async ngOnInit() {
    await this.loadBrands();
  }

  async loadBrands() {
    try {
      const brands = await this.service.findAll('brands');
      this.brands.set(brands);
    } catch (err) {
      console.error('Error cargando las marcas:', err);
    }
  }

  async addBrand(newBrand: string) {
    try {
      const created = await this.service.create({ name: newBrand }, 'brands');
      this.brands.update((brands) => [...brands, created]);
    } catch (err) {
      console.error('Error creando brand:', err);
    }
  }

  async deleteBrand(id: number) {
    try {
      await this.service.remove(id, 'brands');
      this.brands.update((brands) => brands.filter((b) => b.id !== id));
    } catch (err) {
      console.error('Error eliminando brand:', err);
    }
  }
}
