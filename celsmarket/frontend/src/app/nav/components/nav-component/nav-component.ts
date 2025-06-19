import { Component } from '@angular/core';
import { NoticeComponent } from '../notice-component/notice-component';
import { SearchComponent } from '../search-component/search-component';
import { CartComponent } from '../cart-component/cart-component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuDecitionComponent } from "../menu-decition-component/menu-decition-component";

@Component({
  selector: 'app-nav-component',
  imports: [
    NoticeComponent,
    SearchComponent,
    CartComponent,
    CommonModule,
    RouterModule,
    MenuDecitionComponent
],
  templateUrl: './nav-component.html',
})
export class NavComponent {
  
}
