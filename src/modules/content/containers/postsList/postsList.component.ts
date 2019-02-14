import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { take, filter, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import isEqual from 'lodash-es/isEqual';

import { TryToGetPostsOnScroll, GetPostsInitial } from './store/postsList.actions';
import { ContentState } from '../../store/content.reducers';
import { selectSelectedTab, selectTabs } from '../../../header/containers/menu/store/menu.selectors';
import { selectPosts, selectLoading, selectInitialized } from './store/postsList.selectors';
import { PostContentDTO, TabDTO } from '../../../../shared/clients/api/api.model';

@Component({
  selector: 'postsList-container',
  template: `
    <postsList-component [posts$]="posts$"
                         [loading$]="loading$"
                         [selectedTab$]="selectedTab$"
                         [tabs$]="tabs$"
                         [initialized$]="initialized$"
                         (onScroll)="fetchPostsOnScroll()">
    </postsList-component>
  `,
  encapsulation: ViewEncapsulation.None
})
export class PostsListContainer implements OnDestroy {

  posts$: Observable<PostContentDTO[]>;
  loading$: Observable<boolean>;
  selectedTab$: Observable<TabDTO>;
  tabs$: Observable<TabDTO[]>;
  initialized$: Observable<boolean>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<ContentState>
  ) {
    this.selectedTab$ = this.store.select(selectSelectedTab);
    this.tabs$ = this.store.select(selectTabs);
    this.posts$ = this.store.select(selectPosts);
    this.loading$ = this.store.select(selectLoading);
    this.initialized$ = this.store.select(selectInitialized);
  }

  ngOnInit() {
    this.fetchPostsOnSelectedTabChange();
  }

  private fetchPostsOnSelectedTabChange() {
    this.selectedTab$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((x, y) => isEqual(x, y)),
        filter((selectedTab: TabDTO) => !!selectedTab)
      )
      .subscribe((selectedTab: TabDTO) => {
        this.store.dispatch(new GetPostsInitial(selectedTab));
      });
  }

  fetchPostsOnScroll() {
    this.selectedTab$
      .pipe(
        take(1), 
        filter((selectedTab: TabDTO) => !!selectedTab)
      )
      .subscribe((selectedTab: TabDTO) => {
        this.store.dispatch(new TryToGetPostsOnScroll(selectedTab));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
