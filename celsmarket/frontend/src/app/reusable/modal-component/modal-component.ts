import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal-component.html',
})
export class ModalComponent {
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;
  @Input() title = '';
  @Input() width = 'max-w-xl'; // DaisyUI width classes

  open() {
    this.dialogRef.nativeElement.showModal();
  }

  close() {
    this.dialogRef.nativeElement.close();
  }
}
