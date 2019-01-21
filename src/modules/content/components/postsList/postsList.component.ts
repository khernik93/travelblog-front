import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile, filter } from 'rxjs/operators';

import * as PostsListActions from './postsList.actions';
import { ContentState } from '../../content.reducers';
import { selectSelectedTab } from '../../../header/components/menu/menu.selectors';
import { HeaderState } from '../../../header/header.reducers';
import { selectPosts } from './postsList.selectors';
import { Post, Tab } from '../../../../shared/clients/api.model';

@Component({
  selector: 'postsList-component',
  styleUrls: ['./postsList.component.scss'],
  templateUrl: './postsList.component.html'
})
export class PostsListComponent implements OnInit, OnDestroy {

  posts$: Observable<Post[]>;

  selectedTab$: Observable<Tab>;
  private alive = true;

  constructor(
    private store: Store<HeaderState | ContentState>
  ) {
    this.selectedTab$ = this.store.select(selectSelectedTab);
    this.posts$ = this.store.select(selectPosts);
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

}
