import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import isEqual from 'lodash-es/isEqual';
import { HeaderState } from '../../../header/store/header.reducers';
import { selectTabs, selectSelectedTab } from '../../../header/containers/menu/store/menu.selectors';
import { GetTabs, SelectTabById, SelectTab } from '../../../header/containers/menu/store/menu.actions';
import { TabDTO, PostContentDTO } from '../../../../shared/clients/api/api.model';
import { filter, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { GetPosts, ClearPosts } from '../../../content/containers/postsList/store/postsList.actions';
import { selectPosts, selectLoading } from '../../../content/containers/postsList/store/postsList.selectors';

@Component({
  selector: 'adminPostsList-container',
  template: `
    <postsTable-component [tabs$]="tabs$"
                          [selectedTab$]="selectedTab$"
                          [posts$]="posts$"
                          [loading$]="loading$"
                          (onTabChanges)="onTabChanges($event)">
    </postsTable-component>
  `
})
export class AdminPostsListContainer implements OnInit, OnDestroy {

  tabs$: Observable<TabDTO[]>;
  selectedTab$: Observable<TabDTO>;
  posts$: Observable<PostContentDTO[]>;
  loading$: Observable<boolean>;

  private destroy$ = new Subject();

  constructor(
    private store: Store<HeaderState>
  ) {
    this.tabs$ = this.store.select(selectTabs);
    this.selectedTab$ = this.store.select(selectSelectedTab);
    this.posts$ = this.store.select(selectPosts);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.getTabs();
    this.watchForSelectedTabChanges();
  }

  private getTabs() {
    this.store.dispatch(new GetTabs());
  }

  private watchForSelectedTabChanges() {
    this.selectedTab$
      .pipe(
        takeUntil(this.destroy$),
        filter((selectedTab: TabDTO) => !!selectedTab),
        distinctUntilChanged((x, y) => isEqual(x, y))
      )
      .subscribe((selectedTab: TabDTO) => {
        this.store.dispatch(new ClearPosts());
        this.store.dispatch(new GetPosts(selectedTab, 0, 9999));
      });
  }

  onTabChanges(values: any) {
    this.store.dispatch(new SelectTabById(values.tabId));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
