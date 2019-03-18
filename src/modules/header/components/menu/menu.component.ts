import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TabDTO } from '../../../../shared/clients/backend/backend.model';
import { ContentRoutes, contentRoutes } from '../../../content/routing/contentRouting.routes';

@Component({
  selector: 'menu-component',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  @Input() selectedTab$: Observable<TabDTO>;
  @Input() tabs$: Observable<TabDTO[]>;
  @Input() hamburgerMenuOpened: boolean = true;

  contentRoutes: ContentRoutes = contentRoutes;

  toggleHamburgerMenu(): void {
    this.hamburgerMenuOpened = !this.hamburgerMenuOpened;
  }

}
