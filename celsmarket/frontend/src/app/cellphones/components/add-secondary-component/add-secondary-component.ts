import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { SecondaryEntityService } from '../../services/seconday-entity-service';

@Component({
  selector: 'app-add-secondary-component',
  imports: [],
  templateUrl: './add-secondary-component.html',
})
export class AddSecondaryComponent {
  private secondaryService = inject(SecondaryEntityService);
  @Input() url: string = '';

  @ViewChild('my_modal_add') modalRef!: ElementRef<HTMLDialogElement>;
  addNewSecondary(value: string, url: string) {
    this.secondaryService.create({ name: value }, url);
    this.modalRef.nativeElement.close();
    return;
  }

  openModal() {
    this.modalRef.nativeElement.showModal();
  }
}
