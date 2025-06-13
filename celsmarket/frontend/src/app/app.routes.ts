import { Routes } from '@angular/router';
import { inventoryComponent } from './inventory/components/inventory-component/inventory-component';
import { LogInComponent } from './auth/components/log-in/log-in-component';
import { ViewDetailsComponent } from './inventory/components/view-details-component/view-details-component';
import { PublicInventoryComponent } from './inventory/components/public-inventory-component/public-inventory-component';
import { RegisterComponent } from './auth/components/register-component/register-component';
import { SalesHistoryComponent } from './sales/components/sales-history-component/sales-history-component';
import { PageComponent } from './hero-page/components/page-component/page-component';
import { CreateForm } from './cellphones/components/create-form/create-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'availables',
    pathMatch: 'full',
  },
  {
    path: 'inventory',
    component: inventoryComponent,
  },
  {
    path: 'availables',
    component: PublicInventoryComponent,
  },
  {
    path: 'login',
    component: LogInComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'availables/:id',
    component: ViewDetailsComponent,
  },
  {
    path: 'hero',
    component: PageComponent,
  },
  {
    path: 'create',
    component: CreateForm
  },
  {
    path: 'sales',
    component: SalesHistoryComponent,
  },
];
