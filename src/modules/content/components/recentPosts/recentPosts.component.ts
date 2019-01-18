import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, takeWhile, filter, combineLatest } from 'rxjs/operators';
import { AppState } from '../../../app/app.reducers';
import { Post, PostResponse } from '../postsList/postsList.model';
import { SetRecentPosts } from './recentPosts.actions';
import { RecentPostsService } from './recentPosts.service';

export const RECENT_POSTS_LIMIT = 3;

@Component({
  selector: 'recentPosts-component',
  styleUrls: ['../postsList/postsList.component.scss', './recentPosts.component.scss'],
  templateUrl: './recentPosts.component.html'
})
export class RecentPostsComponent implements OnInit {

  recentPosts$: Observable<Post[]>;

  private alive = true;

  constructor(
    private store: Store<AppState>,
    private recentPostsService: RecentPostsService
  ) {
    this.recentPosts$ = this.store.select(state => state.recentPosts.recentPosts);
  }

  ngOnInit() {
    this.recentPostsService.getRecentPosts()
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe((recentPosts: Post[]) => {
        this.store.dispatch(new SetRecentPosts(recentPosts));
      });
  }

}
