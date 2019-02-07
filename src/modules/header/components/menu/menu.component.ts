import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as MenuActions from './store/menu.actions';
import { HeaderState } from '../../store/header.reducers';
import { selectTabs, selectSelectedTab } from './store/menu.selectors';
import { TabDTO } from '../../../../shared/clients/api/api.model';

@Component({
  selector: 'menu-component',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  selectedTab$: Observable<TabDTO>;
  tabs$: Observable<TabDTO[]>;
  hamburgerMenuOpened: boolean = true;

  constructor(
    private store: Store<HeaderState>
  ) {
    this.tabs$ = this.store.select(selectTabs);
    this.selectedTab$ = this.store.select(selectSelectedTab);
  }

  ngOnInit(): void {
    this.store.dispatch(new MenuActions.GetTabs());
  }

  selectTab(tab: TabDTO): void {
    this.store.dispatch(new MenuActions.SelectTab(tab));
  }

  toggleHamburgerMenu(): void {
    this.hamburgerMenuOpened = !this.hamburgerMenuOpened;
  }

}
