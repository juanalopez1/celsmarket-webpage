import { Component, inject } from '@angular/core';
import { NoticeComponent } from '../notice-component/notice-component';
import { SearchComponent } from '../search-component/search-component';
import { MenuComponent } from '../menu-component/menu-component';
import { CartComponent } from '../cart-component/cart-component';
import { UserService } from '../../../auth/services/user-service';
import { AdminMenuComponent } from '../admin-menu-component/admin-menu-component';

@Component({
  selector: 'app-nav-component',
  imports: [NoticeComponent, SearchComponent, MenuComponent, CartComponent, AdminMenuComponent],
  templateUrl: './nav-component.html',
})
export class NavComponent {
  /*allowed: boolean = false;
  private userService = inject(UserService);

  ngOnInit(): void {
    this.isAllowed();
  }
  async isAllowed() {
    const username = localStorage.getItem('username');
    if (username === null) {
      return;
    }
    const user = await this.userService.getByEmail(username!);
    if (user.data.role === 'admin') {
      this.allowed = true;
    }
  }*/
}
