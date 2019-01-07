import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeWhile, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppState } from '../../app.reducers';
import * as HeaderActions from '../header.actions';
import { MenuService } from './menu.service';

@Component({
  selector: 'menu-component',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {

  selectedTab: string;
  tabs: string[];
  hamburgerMenuOpened: Boolean = false;

  private selectedTab$: Observable<string>;
  private tabs$: Observable<string[]>;
  private alive = true;

  constructor(
    private store: Store<AppState>,
    private menuService: MenuService
  ) {
    this.tabs$ = this.store.select(state => state.header.tabs);
    this.selectedTab$ = this.store.select(state => state.header.selectedTab);
  }

  ngOnInit() {
    this.getTabs();
    this.watchForSelectedTab();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private getTabs() {
    this.menuService.getTabs()
    .subscribe(tabs => this.store.dispatch(new HeaderActions.SetTabs(tabs)));
    
    this.tabs$
    .pipe(takeWhile(() => this.alive))
    .pipe(tap(tabs => this.tabs = tabs))
    .subscribe(() => this.selectTab(this.tabs[0]));
  }

  private watchForSelectedTab() {
    this.selectedTab$
    .pipe(takeWhile(() => this.alive))
    .subscribe(selectedTab => this.selectedTab = selectedTab);
  }

  selectTab(tab: string) {
    this.store.dispatch(new HeaderActions.SelectTab(tab));
  }

  toggleHamburgerMenu() {
    this.hamburgerMenuOpened = !this.hamburgerMenuOpened;
  }

}
