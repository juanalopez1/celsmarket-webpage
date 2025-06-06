import { Routes } from '@angular/router';
import { inventoryComponent } from './inventory/components/inventory-component/inventory-component';
import { LogInComponent } from './auth/components/log-in/log-in-component';
import { ViewDetailsComponent } from './inventory/components/view-details-component/view-details-component';
import { PublicInventoryComponent } from './inventory/components/public-inventory-component/public-inventory-component';
import { RegisterComponent } from './auth/components/register-component/register-component';
import { SalesHistoryComponent } from './sales/components/sales-history-component/sales-history-component';

export const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'inventory',
    pathMatch: 'full',
  },
  {
    path: 'inventory',
    component: PublicInventoryComponent,
  },
  {
    path: 'inventory/:id',
    component: ViewDetailsComponent,
  },*/
  {
    path: 'login',
    component: LogInComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'sales',
    component: SalesHistoryComponent,
  },
];

