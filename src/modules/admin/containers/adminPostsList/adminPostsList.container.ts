import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderState } from '../../../header/store/header.reducers';
import { selectTabs } from '../../../header/containers/menu/store/menu.selectors';
import { GetTabs } from '../../../header/containers/menu/store/menu.actions';
import { TabDTO, PostContentDTO } from '../../../../shared/clients/api/api.model';
import { take, filter } from 'rxjs/operators';
import { selectAdminSelectedTabId, selectAdminPosts } from './store/adminPostsList.selectors';
import { GetAdminPosts } from './store/adminPostsList.actions';
import { AdminState } from '../../store/admin.reducers';

@Component({
  selector: 'adminPostsList-container',
  template: `
    <postsTable-component [tabs$]="tabs$"
                          [adminSelectedTabId$]="adminSelectedTabId$"
                          [adminPosts$]="adminPosts$"
                          (onTabChanges)="onTabChanges($event)">
    </postsTable-component>
  `
})
export class AdminPostsListContainer implements OnInit {

  tabs$: Observable<TabDTO[]>;
  adminSelectedTabId$: Observable<number>;
  adminPosts$: Observable<PostContentDTO[]>;

  constructor(
    private store: Store<HeaderState | AdminState>
  ) {
    this.tabs$ = this.store.select(selectTabs);
    this.adminSelectedTabId$ = this.store.select(selectAdminSelectedTabId);
    this.adminPosts$ = this.store.select(selectAdminPosts);
  }

  ngOnInit() {
    this.getTabs();
    this.getPostsBasedOnSelectedTab();
  }

  private getTabs() {
    this.store.dispatch(new GetTabs());
  }

  private getPostsBasedOnSelectedTab() {
    this.adminSelectedTabId$
      .pipe(
        take(1),
        filter((selectedTabId: number) => selectedTabId > 0)
      )
      .subscribe((selectedTabId: number) => this.getPostsByTabId(selectedTabId));
  }

  onTabChanges(values: any) {
    this.getPostsByTabId(values.tabId);
  }

  private getPostsByTabId(tabId: number) {
    this.store.dispatch(new GetAdminPosts(tabId));
  }

}
