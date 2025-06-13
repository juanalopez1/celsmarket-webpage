import { Component, inject } from '@angular/core';
import { NoticeComponent } from '../notice-component/notice-component';
import { SearchComponent } from '../search-component/search-component';
import { MenuComponent } from '../menu-component/menu-component';
import { CartComponent } from '../cart-component/cart-component';
import { UserService } from '../../../auth/services/user-service';
import { AdminMenuComponent } from '../admin-menu-component/admin-menu-component';
import { LogService } from '../../../auth/services/log-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuDecitionComponent } from "../menu-decition-component/menu-decition-component";

@Component({
  selector: 'app-nav-component',
  imports: [
    NoticeComponent,
    SearchComponent,
    MenuComponent,
    CartComponent,
    AdminMenuComponent,
    CommonModule,
    RouterModule,
    MenuDecitionComponent
],
  templateUrl: './nav-component.html',
})
export class NavComponent {
  
}
