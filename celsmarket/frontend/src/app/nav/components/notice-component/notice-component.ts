import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../auth/services/user-service';

@Component({
  selector: 'app-notice-component',
  imports: [CommonModule],
  templateUrl: './notice-component.html',
})
export class NoticeComponent implements OnInit {
  ngOnInit(): void {
    this.isAllowed();
  }
  private userService = inject(UserService);

  public message: string = 'ENVIOS A TODO URUGUAY!';
  allowed: boolean = false;

  changeMessage(newMessage: string) {
    this.message = newMessage;
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal.close();
  }

  async isAllowed() {
    const username = localStorage.getItem('username');
    if(username === null){
      return;
    }
    const user = await this.userService.getByEmail(username!);
    if (user.data.role === 'admin') {
      this.allowed = true;
    }
  }
}
