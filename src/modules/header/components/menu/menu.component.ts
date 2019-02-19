import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TabDTO } from '../../../../shared/clients/api/api.model';

@Component({
  selector: 'menu-component',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  @Input() selectedTab$: Observable<TabDTO>;
  @Input() tabs$: Observable<TabDTO[]>;
  @Input() hamburgerMenuOpened: boolean = true;

  routes: any = {
    posts: (tabId) => `/posts/${tabId}`
  };

  toggleHamburgerMenu(): void {
    this.hamburgerMenuOpened = !this.hamburgerMenuOpened;
  }

}
