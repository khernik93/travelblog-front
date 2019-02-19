import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GetRecentPosts } from './store/recentPosts.actions';
import { selectRecentPosts } from './store/recentPosts.selectors';
import { ContentState } from '../../store/content.reducers';
import { PostContentDTO } from '../../../../shared/clients/api/api.model';

@Component({
  selector: 'recentPosts-container',
  template: `
    <recentPosts-component [recentPosts$]="recentPosts$"></recentPosts-component>
  `
})
export class RecentPostsContainer implements OnInit {

  recentPosts$: Observable<PostContentDTO[]>;

  constructor(
    private store: Store<ContentState>
  ) {
    this.recentPosts$ = this.store.select(selectRecentPosts);
  }

  ngOnInit() {
    this.store.dispatch(new GetRecentPosts());
  }

}
