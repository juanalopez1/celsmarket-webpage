import { Injectable } from '@angular/core';
import { Cellphone } from '../models/cellphone';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CellphoneService {
  constructor() {}

  private url: string = 'http://localhost:8080/inventory';

  async findAll(): Promise<Cellphone[]> {
    const response = await axios.get(this.url);
    return response.data as Cellphone[];
  }

  async findAvailables(): Promise<Cellphone[]> {
    const response = await axios.get(this.url + "/availables");
    return response.data as Cellphone[];
  }

  async findById(id : number): Promise<Cellphone> {
    const response = await axios.get(this.url + "/" + id);
    return response.data as Cellphone;
  }

  async findByIdAvailable(id : number): Promise<Cellphone> {
    const response = await axios.get(this.url + "/availables/" + id);
    return response.data as Cellphone;
  }

  async create(cellphone: Cellphone): Promise<Cellphone> {
    const { id, ...cellphoneWithoutId } = cellphone;
    const response = await axios.post(this.url, cellphoneWithoutId);
    return response.data as Cellphone;
  }

  async remove(id: number): Promise<void> {
    await axios.delete(`${this.url}/${id}`);
  }

  async update(cellphone: Cellphone): Promise<Cellphone> {
    const result = await axios.put<Cellphone>(
      `${this.url}/${cellphone.id}`,
      cellphone
    );
    return result.data;
  }
}
