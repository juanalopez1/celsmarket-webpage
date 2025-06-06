import { Component } from '@angular/core';
import { NoticeComponent } from "../notice-component/notice-component";
import { SearchComponent } from "../search-component/search-component";
import { MenuComponent } from "../menu-component/menu-component";
import { CartComponent } from "../cart-component/cart-component";

@Component({
  selector: 'app-nav-component',
  imports: [NoticeComponent, SearchComponent, MenuComponent, CartComponent],
  templateUrl: './nav-component.html',
})
export class NavComponent {

}
