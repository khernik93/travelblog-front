import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderState } from '../../../header/store/header.reducers';
import { selectTabs } from '../../../header/containers/menu/store/menu.selectors';
import { GetTabs } from '../../../header/containers/menu/store/menu.actions';
import { TabDTO, PostContentDTO } from '../../../../shared/clients/api/api.model';
import { ContentState } from '../../../content/store/content.reducers';
import { GetPosts } from './store/managePosts.actions';
import { selectAdminPosts, selectAdminSelectedTabId } from './store/managePosts.selectors';

@Component({
  selector: 'managePosts-container',
  template: `
    <postsTable-component [tabs$]="tabs$"
                          [selectedTabId$]="adminSelectedTabId$"
                          [posts$]="adminPosts$"
                          (onTabChanges)="onTabChanges($event)">
    </postsTable-component>
  `
})
export class ManagePostsContainer implements OnInit {

  tabs$: Observable<TabDTO[]>;
  adminSelectedTabId$: Observable<number>;
  adminPosts$: Observable<PostContentDTO[]>;

  constructor(
    private store: Store<HeaderState | ContentState>
  ) {
    this.tabs$ = this.store.select(selectTabs);
    this.adminSelectedTabId$ = this.store.select(selectAdminSelectedTabId);
    this.adminPosts$ = this.store.select(selectAdminPosts);
  }

  ngOnInit() {
    this.getTabs();
  }

  private getTabs() {
    this.store.dispatch(new GetTabs());
  }

  onTabChanges(values: any) {
    this.store.dispatch(new GetPosts(values.tabId));
  }

}
