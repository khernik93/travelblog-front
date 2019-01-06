import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

import { Post } from '../content.model';
import { AppState } from '../../app.reducers';
import { TransferHttp } from '../../shared/transfer-http/transfer-http';
import * as ContentActions from '../content.actions';

const urls = {
  posts: '/posts'
};

@Component({
  selector: 'posts-component',
  styleUrls: ['../content.component.scss', './posts.component.scss'],
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[] = [];

  private selectedTab$: Observable<string>;
  private alive = true;

  constructor(
    private store: Store<AppState>,
    private transferHttp: TransferHttp
  ) { 
    this.selectedTab$ = this.store.select(state => state.header.selectedTab);
  }

  ngOnInit() {
    this.watchForSelectedTab();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private watchForSelectedTab() {
    this.selectedTab$
    .pipe(takeWhile(() => this.alive))
    .subscribe(selectedTab => this.getPosts(selectedTab));
  }

  private getPosts(selectedTab: string) {
    this.transferHttp.get(urls.posts, {params: {tab: selectedTab}})
    .pipe(takeWhile(() => this.alive))
    .pipe(tap(posts => this.posts = posts))
    .subscribe(posts => this.store.dispatch(new ContentActions.SetPosts(posts)));
  }

}
