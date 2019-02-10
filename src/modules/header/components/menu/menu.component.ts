import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { GetTabs } from './store/menu.actions';
import { HeaderState } from '../../store/header.reducers';
import { selectTabs, selectSelectedTab } from './store/menu.selectors';
import { TabDTO } from '../../../../shared/clients/api/api.model';

@Component({
  selector: 'menu-component',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  selectedTab: TabDTO;
  tabs$: Observable<TabDTO[]>;
  hamburgerMenuOpened: boolean = true;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<HeaderState>
  ) {
    this.tabs$ = this.store.select(selectTabs);
    this.listenToSelectedTab();
    this.store.select(state => {
      console.log('state', state);
    });
  }

  /**
   * Listens to selectedTab store changes - made this way to avoid
   * using async pipe because of errors it causes here
   */
  private listenToSelectedTab() {
    this.store.select(selectSelectedTab)
      .pipe(
        takeUntil(this.destroy$),
        filter((selectedTab: TabDTO) => !!selectedTab)
      )
      .subscribe((selectedTab: TabDTO) => this.selectedTab = selectedTab);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetTabs());
  }

  toggleHamburgerMenu(): void {
    this.hamburgerMenuOpened = !this.hamburgerMenuOpened;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
