import { Injectable } from '@angular/core';
import axios from 'axios';
import { Storage } from '../models/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  private url: string = 'http://localhost:8080/storages';

  async findAll(): Promise<Storage[]> {
    console.log((await axios.get(this.url)).data);
    const response = await axios.get(this.url);
    return response.data as Storage[];
  }

  async create(data: { number: number; unit: string }): Promise<Storage> {
    data.unit = data.unit.toUpperCase();
    const response = await axios.post(this.url, data);
    return response.data as Storage;
  }

  async remove(id: number): Promise<void> {
    await axios.delete(`${this.url}/${id}`);
  }
}
