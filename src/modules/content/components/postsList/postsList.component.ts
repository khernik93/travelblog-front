import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile, take, filter } from 'rxjs/operators';

import * as PostsListActions from './store/postsList.actions';
import { ContentState } from '../../store/content.reducers';
import { selectSelectedTab } from '../../../header/components/menu/store/menu.selectors';
import { HeaderState } from '../../../header/store/header.reducers';
import { selectPosts, selectLoading } from './store/postsList.selectors';
import { Post, Tab } from '../../../../shared/clients/api.model';
import { PostsListService } from './postsList.service';

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
    private store: Store<HeaderState | ContentState>,
    private postsListService: PostsListService
  ) {
    this.selectedTab$ = this.store.select(selectSelectedTab);
    this.posts$ = this.store.select(selectPosts);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.onSelectedTab();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private onSelectedTab() {
    this.selectedTab$
      .pipe(
        takeWhile(() => this.alive),
        filter((selectedTab: Tab) => !!selectedTab)
      )
      .subscribe((selectedTab: Tab) => {
        this.store.dispatch(new PostsListActions.ClearPosts);
        this.store.dispatch(new PostsListActions.GetPosts(
          selectedTab, 
          this.postsListService.DEFAULT_START, 
          this.postsListService.DEFAULT_END
        ));
      });
  }

  onScroll() {
    this.selectedTab$
      .pipe(
        take(1),
        filter((selectedTab: Tab) => !!selectedTab)
      )
      .subscribe((selectedTab: Tab) => {
        this.store.dispatch(new PostsListActions.TryToGetPostsOnScroll(selectedTab));
      });
  }

}
