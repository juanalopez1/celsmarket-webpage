import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateForm } from "./cellphones/components/create-form/create-form";
import { LogInComponent } from "./auth/components/log-in/log-in-component";
import { RegisterComponent } from "./auth/components/register-component/register-component";
import { NavComponent } from "./nav/components/nav-component/nav-component";
import { SalesHistoryComponent } from "./sales/components/sales-history-component/sales-history-component";

@Component({
  selector: 'app-root',
  imports: [/*RouterOutlet,*/ CreateForm, NavComponent, SalesHistoryComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'celsmarket';
}
