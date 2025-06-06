import { Cellphone } from '../../cellphones/models/cellphone';
import { Secondary } from '../../cellphones/models/secondary-entity';
import { Client } from './client';

export class Sale {
  id!: number;
  client!: Client;
  cellphone!: Cellphone;
  currency!: Secondary;
  date_hour!: string;
  address!: string;
  city!: Secondary;
}
