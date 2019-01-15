import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppState } from '../../../app/app.reducers';
import * as MenuActions from './menu.actions';
import { MenuService } from './menu.service';

@Component({
  selector: 'menu-component',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {

  selectedTab$: Observable<string>;
  tabs$: Observable<string[]>;
  hamburgerMenuOpened: boolean = true;

  private alive: boolean = true;

  constructor(
    private store: Store<AppState>,
    private menuService: MenuService
  ) {
    this.tabs$ = this.store.select(state => state.menu.tabs);
    this.selectedTab$ = this.store.select(state => state.menu.selectedTab);
  }

  ngOnInit(): void {
    this.menuService.getTabs()
      .pipe(takeWhile(() => this.alive))
      .subscribe((tabs: string[]) => this.store.dispatch(new MenuActions.SetTabs(tabs)));
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  selectTab(tab: string): void {
    this.store.dispatch(new MenuActions.SelectTab(tab));
  }

  toggleHamburgerMenu(): void {
    this.hamburgerMenuOpened = !this.hamburgerMenuOpened;
  }

}
