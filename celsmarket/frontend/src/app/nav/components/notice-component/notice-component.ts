import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../auth/services/user-service';
import { LogService } from '../../../auth/services/log-service';

@Component({
  selector: 'app-notice-component',
  imports: [CommonModule],
  templateUrl: './notice-component.html',
})
export class NoticeComponent implements OnInit {
  allowed: boolean = false;
  private logService = inject(LogService);

  async ngOnInit() {
    this.allowed = await this.logService.isAdmin();
  }
  public message: string = 'ENVIOS A TODO URUGUAY!';

  changeMessage(newMessage: string) {
    this.message = newMessage;
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal.close();
  }
}
