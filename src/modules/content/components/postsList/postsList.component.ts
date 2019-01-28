import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeWhile, filter, take } from 'rxjs/operators';

import * as PostsListActions from './store/postsList.actions';
import { ContentState } from '../../store/content.reducers';
import { selectSelectedTab } from '../../../header/components/menu/store/menu.selectors';
import { HeaderState } from '../../../header/store/header.reducers';
import { selectPosts, selectLoading } from './store/postsList.selectors';
import { Post, Tab } from '../../../../shared/clients/api.model';

@Component({
  selector: 'postsList-component',
  styleUrls: ['./postsList.component.scss'],
  templateUrl: './postsList.component.html'
})
export class PostsListComponent implements OnInit, OnDestroy {

  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;

  selectedTab$: Observable<Tab>;
  private alive = true;

  constructor(
    private store: Store<HeaderState | ContentState>
  ) {
    this.selectedTab$ = this.store.select(selectSelectedTab);
    this.posts$ = this.store.select(selectPosts);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.getPostsOnSelectedTab();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private getPostsOnSelectedTab() {
    this.selectedTab$
      .pipe(
        takeWhile(() => this.alive),
        filter((selectedTab: Tab) => selectedTab !== null)
      )
      .subscribe((selectedTab: Tab) => {
        this.store.dispatch(new PostsListActions.GetPosts(selectedTab));
      });
  }

  onScroll() {
    combineLatest(this.selectedTab$, this.loading$)
      .pipe(
        take(1),
        filter(([_, loading]) => loading === false)
      )
      .subscribe(([selectedTab]) => {
        this.store.dispatch(new PostsListActions.GetPostsOnScroll(selectedTab));
      });
  }

}
