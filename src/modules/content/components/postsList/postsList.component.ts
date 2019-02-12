import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { take, filter, map, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import isEqual from 'lodash-es/isEqual';

import { TryToGetPostsOnScroll, GetPostsInitial } from './store/postsList.actions';
import { ContentState } from '../../store/content.reducers';
import { selectSelectedTab, selectTabs } from '../../../header/components/menu/store/menu.selectors';
import { selectPosts, selectLoading, selectInitialized } from './store/postsList.selectors';
import { PostContentDTO, TabDTO } from '../../../../shared/clients/api/api.model';

@Component({
  selector: 'postsList-component',
  styleUrls: ['./postsList.component.scss'],
  templateUrl: './postsList.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PostsListComponent implements OnDestroy {

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

  singlePostRoute(postId): Observable<String> {
    return this.selectedTab$
      .pipe(
        takeUntil(this.destroy$),
        map((selectedTab: TabDTO) => '/posts/' + selectedTab.id + '/' + postId)
      );
  }

  onScroll() {
    this.selectedTab$
      .pipe(take(1), filter((selectedTab: TabDTO) => !!selectedTab))
      .subscribe((selectedTab: TabDTO) => this.store.dispatch(new TryToGetPostsOnScroll(selectedTab)));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
