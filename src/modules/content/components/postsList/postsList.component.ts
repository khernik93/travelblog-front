import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

import { Post } from './postsList.model';
import { AppState } from '../../../app/app.reducers';
import * as PostsListActions from './postsList.actions';
import { PostsListService } from './postsList.service';

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
    private store: Store<AppState>,
    private postsService: PostsListService
  ) { 
    this.selectedTab$ = this.store.select(state => state.menu.selectedTab);
  }

  ngOnInit() {
    this.getPostsOnSelectedTab();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private getPostsOnSelectedTab() {
    this.selectedTab$
    .pipe(takeWhile(() => this.alive))
    .subscribe(selectedTab => this.getPosts(selectedTab));
  }

  private getPosts(selectedTab: string) {
    this.postsService.getPosts(selectedTab)
    .pipe(takeWhile(() => this.alive))
    .pipe(tap((response: any) => this.posts = response.content))
    .subscribe(posts => this.store.dispatch(new PostsListActions.SetPosts(posts)));
  }

}
