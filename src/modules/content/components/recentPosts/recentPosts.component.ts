import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, takeWhile, filter } from 'rxjs/operators';
import { AppState } from '../../../app/app.reducers';
import { Post, PostResponse } from '../postsList/postsList.model';
import { SetRecentPosts } from './recentPosts.actions';

@Component({
  selector: 'recentPosts-component',
  styleUrls: ['../postsList/postsList.component.scss', './recentPosts.component.scss'],
  templateUrl: './recentPosts.component.html'
})
export class RecentPostsComponent implements OnInit {

  recentPosts$: Observable<Post[]>;

  private posts$: Observable<Post[]>;
  private alive = true;

  constructor(
    private store: Store<AppState>
  ) {
    this.posts$ = this.store.select(state => state.postsList.posts);
    this.recentPosts$ = this.store.select(state => state.recentPosts.recentPosts);
  }

  ngOnInit() {
    this.posts$
      .pipe(
        takeWhile(() => this.alive),
        filter((posts: PostResponse) => posts.content !== undefined),
        map((posts: PostResponse) => posts.content.slice(0, 1))
      )
      .subscribe((recentPosts: Post[]) => {
        this.alive = false;
        this.store.dispatch(new SetRecentPosts(recentPosts));
      });
  }

}
