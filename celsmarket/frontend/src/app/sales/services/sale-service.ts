import { Injectable } from '@angular/core';
import axios from 'axios';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private url: string = 'http://localhost:8080/sales';

  async getAll(): Promise<Sale[]> {
    const response = await axios.get(this.url);
    return response.data as Sale[];
  }

  async getById(id: number): Promise<Sale> {
    const response = await axios.get(this.url + '/' + id);
    return response.data as Sale;
  }
}
