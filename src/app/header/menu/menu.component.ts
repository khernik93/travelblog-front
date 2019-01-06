import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppState } from '../../app.reducers';
import * as HeaderActions from '../header.actions';
import { TransferHttp } from '../../shared/transfer-http/transfer-http';

const urls = {
  countries: '/countries'
};

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
    private transferHttp: TransferHttp
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
    this.transferHttp.get(urls.countries)
    .subscribe(countries => this.store.dispatch(new HeaderActions.SetTabs(countries)));
    
    this.tabs$
    .pipe(takeWhile(() => this.alive))
    .subscribe(tabs => {
      this.tabs = tabs;
      this.selectTab(0);
    });
  }

  private watchForSelectedTab() {
    this.selectedTab$
    .pipe(takeWhile(() => this.alive))
    .subscribe(selectedTab => this.selectedTab = selectedTab);
  }

  selectTab(tab: number) {
    this.store.dispatch(new HeaderActions.SelectTab(this.tabs[tab]));
  }

  toggleHamburgerMenu() {
    this.hamburgerMenuOpened = !this.hamburgerMenuOpened;
  }

}
