import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GetRecentPosts } from './recentPosts.actions';
import { selectRecentPosts } from './recentPosts.selectors';
import { ContentState } from '../../content.reducers';
import { Post } from '../../../../shared/clients/api.model';

@Component({
  selector: 'recentPosts-component',
  styleUrls: ['../postsList/postsList.component.scss', './recentPosts.component.scss'],
  templateUrl: './recentPosts.component.html'
})
export class RecentPostsComponent implements OnInit {

  recentPosts$: Observable<Post[]>;

  constructor(
    private store: Store<ContentState>
  ) {
    this.recentPosts$ = this.store.select(selectRecentPosts);
  }

  ngOnInit() {
    this.store.dispatch(new GetRecentPosts());
  }

}
