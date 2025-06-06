import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import axios from 'axios';
import { Secondary } from '../models/secondary-entity';

@Injectable({
  providedIn: 'root',
})
export class SecondaryEntityService {
  constructor() {}

  private url: string = 'http://localhost:8080';

  async findAll(entity : string): Promise<Secondary[]> {
    console.log((await axios.get(this.url + "/" + entity)).data );
    const response = await axios.get(this.url + "/" + entity);
    return response.data as Secondary[];
  }

  async create(data: { "name": string }, entity : string ): Promise<Secondary> {
    data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();
    const response = await axios.post(this.url + "/" + entity, data);
    return response.data as Secondary;
  }

  async remove(id: number, entity : string): Promise<void> {
    await axios.delete(`${this.url}/${entity}/${id}`);
  }
}
