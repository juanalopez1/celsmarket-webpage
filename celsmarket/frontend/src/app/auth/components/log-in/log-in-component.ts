import { Component, inject, Input } from '@angular/core';
import { LogService } from '../../services/log-service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './log-in-component.html',
})
export class LogInComponent {
  private logService = inject(LogService);

  @Input() user: User = {
    name: '',
    email: '',
    password: '',
  };

  logIn(form: NgForm) {
    if (form.valid) {
      this.logService.logIn(this.user);
      form.reset();
    }
    return;
  }
}
