import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { RouterLink, RouterModule } from '@angular/router';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { LogService } from '../../services/log-service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-log-in',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './modal-log-in.html',
})
export class ModalLogIn {
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
      this.closeModal()
    } else {
    }
    return;
  }

  @ViewChild('dialog') loginModalRef!: ElementRef<HTMLDialogElement>;

  openModal() {
    this.loginModalRef.nativeElement.showModal();
  }

  closeModal() {
    this.loginModalRef.nativeElement.close();
  }
}
