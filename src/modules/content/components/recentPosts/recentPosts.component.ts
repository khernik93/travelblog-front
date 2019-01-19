import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Post } from '../postsList/postsList.model';
import { SetRecentPosts } from './recentPosts.actions';
import { RecentPostsService } from './recentPosts.service';
import { selectRecentPosts } from './recentPosts.selectors';
import { ContentState } from '../../content.reducers';

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
    private store: Store<ContentState>,
    private recentPostsService: RecentPostsService
  ) {
    this.recentPosts$ = this.store.select(selectRecentPosts);
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
