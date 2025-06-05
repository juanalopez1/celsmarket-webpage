import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrandComponent } from './cellphones/components/brand-component/brand-component';
import { CreateForm } from "./cellphones/components/create-form/create-form";
import { inventoryComponent } from "./cellphones/components/inventory-component/inventory-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BrandComponent, CreateForm, inventoryComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'celsmarket';
}
