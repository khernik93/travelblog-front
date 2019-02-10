import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  }

  ngOnInit(): void {
    this.listenToSelectedTab();
    this.store.dispatch(new GetTabs());
  }

  // It's here because async pipe (| async) causes runtime errors
  private listenToSelectedTab() {
    this.store.select(selectSelectedTab)
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedTab: TabDTO) => this.selectedTab = selectedTab);
  }

  toggleHamburgerMenu(): void {
    this.hamburgerMenuOpened = !this.hamburgerMenuOpened;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
