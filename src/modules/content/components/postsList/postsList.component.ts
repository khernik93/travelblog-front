import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { take, filter, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import isEqual from 'lodash-es/isEqual';

import { TryToGetPostsOnScroll, GetPostsOnRouteChange } from './store/postsList.actions';
import { ContentState } from '../../store/content.reducers';
import { selectSelectedTab, selectTabs } from '../../../header/components/menu/store/menu.selectors';
import { HeaderState } from '../../../header/store/header.reducers';
import { selectPosts, selectLoading, selectInitialized } from './store/postsList.selectors';
import { PostContentDTO, TabDTO } from '../../../../shared/clients/api/api.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'postsList-component',
  styleUrls: ['./postsList.component.scss'],
  templateUrl: './postsList.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PostsListComponent implements OnInit, OnDestroy {

  posts$: Observable<PostContentDTO[]>;
  loading$: Observable<boolean>;
  selectedTab$: Observable<TabDTO>;
  tabs$: Observable<TabDTO[]>;
  initialized$: Observable<boolean>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<HeaderState | ContentState>,
    private route: ActivatedRoute
  ) {
    this.selectedTab$ = this.store.select(selectSelectedTab);
    this.tabs$ = this.store.select(selectTabs);
    this.posts$ = this.store.select(selectPosts);
    this.loading$ = this.store.select(selectLoading);
    this.initialized$ = this.store.select(selectInitialized);
  }

  ngOnInit() {
    this.listenToRouteTabIdChanges();
  }

  private listenToRouteTabIdChanges(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((x: any, y: any) => isEqual(x, y)),
        map((params: any) => params.get('tabId'))
      )
      .subscribe((tabId: number) => {
        this.store.dispatch(new GetPostsOnRouteChange(tabId));
      });
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
