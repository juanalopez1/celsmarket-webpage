import { Component, inject } from '@angular/core';
import { UserService } from '../../../auth/services/user-service';
import { RouterModule } from '@angular/router';
import { LogService } from '../../../auth/services/log-service';

@Component({
  selector: 'app-admin-menu-component',
  imports: [RouterModule],
  templateUrl: './admin-menu-component.html',
  styles: ``,
})
export class AdminMenuComponent {
  public logService = inject(LogService);
}
