import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

import { Post } from './postsList.model';
import * as PostsListActions from './postsList.actions';
import { PostsListService } from './postsList.service';
import { ContentState } from '../../content.reducers';
import { selectSelectedTab } from '../../../header/components/menu/menu.selectors';
import { HeaderState } from '../../../header/header.reducers';

@Component({
  selector: 'postsList-component',
  styleUrls: ['./postsList.component.scss'],
  templateUrl: './postsList.component.html'
})
export class PostsListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];

  private selectedTab$: Observable<string>;
  private alive = true;

  constructor(
    private store: Store<HeaderState | ContentState>,
    private postsListService: PostsListService
  ) { 
    this.selectedTab$ = this.store.select(selectSelectedTab);
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
        takeWhile(() => this.alive)
      )
      .subscribe(selectedTab => {
        this.getPosts(selectedTab)
      });
  }

  private getPosts(selectedTab: string) {
    this.postsListService.getPosts(selectedTab)
      .pipe(
        takeWhile(() => this.alive),
        tap((response: any) => this.posts = response.content)
      )
      .subscribe(posts => {
        this.store.dispatch(new PostsListActions.SetPosts(posts));
      });
  }

}
