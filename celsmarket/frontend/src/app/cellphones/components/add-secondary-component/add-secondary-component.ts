import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { SecondaryEntityService } from '../../services/seconday-entity-service';

@Component({
  selector: 'app-add-secondary-component',
  imports: [],
  templateUrl: './add-secondary-component.html',
})
export class AddSecondaryComponent {
  private secondaryService = inject(SecondaryEntityService);
  @Input() url : string = '';

  addNewSecondary(value: string, url: string) {
    return this.secondaryService.create({ name: value }, url);
  }
}
