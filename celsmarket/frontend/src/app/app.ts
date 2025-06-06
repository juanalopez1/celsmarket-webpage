import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrandComponent } from './cellphones/components/brand-component/brand-component';
import { CreateForm } from "./cellphones/components/create-form/create-form";
import { LogInComponent } from "./auth/components/log-in/log-in-component";
import { RegisterComponent } from "./auth/components/register-component/register-component";
import { NavComponent } from "./nav/components/nav-component/nav-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BrandComponent, CreateForm, LogInComponent, RegisterComponent, NavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'celsmarket';
}
