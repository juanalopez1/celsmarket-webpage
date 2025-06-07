import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LogService } from '../../services/log-service';
import { User } from '../../models/user';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-component',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './register-component.html',
})
export class RegisterComponent {
  private logService = inject(LogService);

  @Input() user: User = {
    name: '',
    email: '',
    password: '',
  };

  registerNew(form: NgForm) {
    if (form.valid) {
      this.logService.register(this.user);
      form.reset();
    }
    return;
  }
}
