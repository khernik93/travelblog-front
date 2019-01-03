import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppState } from '../../app.reducers';
import * as HeaderActions from '../header.actions';

@Component({
  selector: 'menu-component',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {

  selectedTab: number;
  tabs: string[];

  private selectedTab$: Observable<number>;
  private tabs$: Observable<string[]>;
  private alive = true;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private initialize() {
    this.tabs$ = this.store.select(state => state.header.tabs);
    this.selectedTab$ = this.store.select(state => state.header.selectedTab);
    
    this.tabs$
    .pipe(takeWhile(() => this.alive))
    .subscribe(tabs => this.tabs = tabs);

    this.selectedTab$
    .pipe(takeWhile(() => this.alive))
    .subscribe(selectedTab => this.selectedTab = selectedTab);
  }

  selectTab(tab: number) {
    this.store.dispatch(new HeaderActions.SelectTab(tab));
  }

}
