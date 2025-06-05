import { Storage } from "../models/storage"
import { Secondary } from "./secondary-entity";
export class Cellphone {
    id! : number;
    stock! : number;
    price! : number;
    batteryCondition! : number;
    description! : string;
    storage! : Storage;
    model! : Secondary;
    color! : Secondary;
    condition! : Secondary;
    brand! : Secondary;
    shown! : boolean;
    sold!: boolean
}