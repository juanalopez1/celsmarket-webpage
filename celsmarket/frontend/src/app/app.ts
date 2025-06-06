import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateForm } from './cellphones/components/create-form/create-form';
import { LogInComponent } from './auth/components/log-in/log-in-component';
import { RegisterComponent } from './auth/components/register-component/register-component';
import { NavComponent } from './nav/components/nav-component/nav-component';
import { SalesHistoryComponent } from './sales/components/sales-history-component/sales-history-component';
import { PublicInventoryComponent } from './inventory/components/public-inventory-component/public-inventory-component';
import { inventoryComponent } from './inventory/components/inventory-component/inventory-component';
import { ViewDetailsComponent } from './inventory/components/view-details-component/view-details-component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CreateForm,
    NavComponent,
    SalesHistoryComponent,
    PublicInventoryComponent,
    inventoryComponent,
    ViewDetailsComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'celsmarket';
}
