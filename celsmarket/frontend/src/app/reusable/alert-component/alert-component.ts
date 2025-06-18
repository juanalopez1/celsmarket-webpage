import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-component',
  imports: [CommonModule],
  templateUrl: './alert-component.html',
})
export class AlertComponent {
  @Input() type: 'error' | 'success' | 'info' | 'warning' = 'info';
  @Input() message: string = '';
}
