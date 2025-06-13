import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import axios from 'axios';
import { Secondary } from '../models/secondary-entity';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class SecondaryEntityService {
  constructor() {}

  private url: string = 'http://localhost:8080';
  private storageService = inject(StorageService);
  async findAll(entity: string): Promise<Secondary[]> {
    const response = await axios.get(this.url + '/' + entity);
    return response.data as Secondary[];
  }

  async create(data: { name: string }, entity: string): Promise<Secondary> {
    if (entity === 'storages') {
      const parts = data.name.split(' ');
      const amount = parts[0];
      const unit = parts[1];
      this.storageService.create({ number: parseInt(amount), unit: unit });
    }
    data.name =
      data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();
    const response = await axios.post(this.url + '/' + entity, data);
    return response.data as Secondary;
  }

  async remove(id: number, entity: string): Promise<void> {
    await axios.delete(`${this.url}/${entity}/${id}`);
  }
}
