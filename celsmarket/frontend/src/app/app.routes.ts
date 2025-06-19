import { Routes } from '@angular/router';
import { SalesHistoryComponent } from './sales/components/sales-history-component/sales-history-component';
import { PageComponent } from './hero-page/components/page-component/page-component';
import { CreateForm } from './cellphones/components/create-form/create-form';
import { ClientInventory } from './inventory/client-inventory/client-inventory';
import { AdminInventory } from './inventory/admin-inventory/admin-inventory';
import { ViewDetailsComponent } from './details-page/view-details-component/view-details-component';

export const routes: Routes = [
  { path: '', redirectTo: 'inventory', pathMatch: 'full' },

  {
    path: 'admin',
    //canActivate: [adminGuard],
    children: [
      { path: 'inventory', component: AdminInventory },
      { path: 'sales', component: SalesHistoryComponent },
      { path: 'create', component: CreateForm },
    ],
  },

  { path: 'inventory', component: ClientInventory },
  { path: 'inventory/:id', component: ViewDetailsComponent },
  { path: 'hero', component: PageComponent },
];
