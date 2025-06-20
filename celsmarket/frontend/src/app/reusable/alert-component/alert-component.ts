import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '../../../../libs/ui/ui-sonner-helm/src/lib/hlm-toaster.component';

@Component({
  selector: 'app-alert-component',
  imports: [CommonModule, HlmToasterComponent],
  standalone: true,
  templateUrl: './alert-component.html',
})
export class AlertComponent {
  @Input() type: 'error' | 'success' | 'info' | 'warning' = 'info';
  @Input() word: string = '';
  @Input() title: string = '';
  @Input() description: string = '';

  showToast() {
    toast(this.title);
  }
}
