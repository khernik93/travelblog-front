import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { GetTabs } from './store/menu.actions';
import { HeaderState } from '../../store/header.reducers';
import { selectTabs, selectSelectedTab } from './store/menu.selectors';
import { TabDTO } from '../../../../shared/clients/api/api.model';

@Component({
  selector: 'menu-container',
  template: `
    <menu-component [selectedTab$]="selectedTab$"
                    [tabs$]="tabs$"
                    [hamburgerMenuOpened]="hamburgerMenuOpened">
    </menu-component>`
})
export class MenuContainer implements OnInit {

  selectedTab$: Observable<TabDTO>;
  tabs$: Observable<TabDTO[]>;
  hamburgerMenuOpened: boolean = true;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<HeaderState>
  ) {
    this.tabs$ = this.store.select(selectTabs);
    this.selectedTab$ = this.store.select(selectSelectedTab);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetTabs());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
