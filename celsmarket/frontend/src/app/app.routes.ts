import { Routes } from '@angular/router';
import { inventoryComponent } from './inventory/components/inventory-component/inventory-component';
import { LogInComponent } from './auth/components/log-in/log-in-component';

export const routes: Routes = [
  {
    path: 'inventory',
    component: inventoryComponent,
  },
    {
      path: 'login',
      component: LogInComponent,
    },
  {
    path: '',
    redirectTo: 'inventory',
    pathMatch: 'full',
  },
];
