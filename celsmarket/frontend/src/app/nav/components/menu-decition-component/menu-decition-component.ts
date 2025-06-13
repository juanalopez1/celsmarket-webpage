import { Component, inject, OnInit } from '@angular/core';
import { LogService } from '../../../auth/services/log-service';
import { AdminMenuComponent } from '../admin-menu-component/admin-menu-component';
import { MenuComponent } from '../menu-component/menu-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-decition-component',
  imports: [CommonModule, AdminMenuComponent, MenuComponent],
  templateUrl: './menu-decition-component.html',
})
export class MenuDecitionComponent implements OnInit {
  
  allowed: boolean = false;
  private logService = inject(LogService);

  async ngOnInit() {
    this.allowed = await this.logService.isAdmin();
  }
}
