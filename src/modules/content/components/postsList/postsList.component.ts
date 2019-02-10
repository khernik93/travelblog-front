import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { take, filter, distinctUntilChanged, map, takeUntil, mergeMap } from 'rxjs/operators';
import isEqual from 'lodash-es/isEqual';

import { ClearPosts, GetPosts, TryToGetPostsOnScroll } from './store/postsList.actions';
import { ContentState } from '../../store/content.reducers';
import { selectSelectedTab, selectTabs } from '../../../header/components/menu/store/menu.selectors';
import { HeaderState } from '../../../header/store/header.reducers';
import { selectPosts, selectLoading, selectInitialized } from './store/postsList.selectors';
import { PostContentDTO, TabDTO } from '../../../../shared/clients/api/api.model';
import { PostsListService } from './postsList.service';
import { ActivatedRoute } from '@angular/router';
import { SelectTab } from '../../../header/components/menu/store/menu.actions';

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
    private route: ActivatedRoute,
    private postsListService: PostsListService
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
        map((params: any) => params.get('tabId')),
        mergeMap((tabId: number) => this.getSelectedTab(tabId)),
        map((result: {tabId: number, tabs: TabDTO[]}) => this.filterTabsById(result.tabs, result.tabId))
      )
      .subscribe((tab: TabDTO) => {
        this.store.dispatch(new SelectTab(tab));
        this.getPosts(tab);
      });
  }

  private getSelectedTab(tabId: number): Observable<{tabId: number, tabs: TabDTO[]}> {
    return this.tabs$
      .pipe(
        takeUntil(this.destroy$),
        filter((tabs: TabDTO[]) => tabs.length > 0),
        map((tabs: TabDTO[]) => ({ tabId, tabs }))
      )
  }

  private filterTabsById(tabs: TabDTO[], tabId: number): TabDTO {
    return tabs.filter(tab => tab.id == tabId)[0] || tabs[0];
  }

  private getPosts(selectedTab: TabDTO) {
    const start = this.postsListService.DEFAULT_START;
    const end = this.postsListService.DEFAULT_END;
    this.store.dispatch(new ClearPosts);
    this.store.dispatch(new GetPosts(selectedTab, start, end));
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
