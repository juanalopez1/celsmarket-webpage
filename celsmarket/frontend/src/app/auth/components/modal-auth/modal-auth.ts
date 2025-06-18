import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { LogService } from '../../services/log-service';

@Component({
  selector: 'app-modal-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-auth.html',
})
export class ModalAuth {
  private logService = inject(LogService);

  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

  user: User = {
    name: '',
    email: '',
    password: '',
  };

  formActual: 'login' | 'register' = 'login';

  openModal(tipo: 'login' | 'register' = 'login') {
    this.formActual = tipo;
    this.dialogRef.nativeElement.showModal();
  }

  closeModal() {
    this.dialogRef.nativeElement.close();
  }

  cambiarFormulario(tipo: 'login' | 'register') {
    this.formActual = tipo;
  }

  logIn(form: NgForm) {
    if (form.valid) {
      this.logService.logIn(this.user);
      form.reset();
      this.closeModal();
    }
  }

  registerNew(form: NgForm) {
    if (form.valid) {
      this.logService.register(this.user);
      form.reset();
      this.closeModal();
    }
  }
}
