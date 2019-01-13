import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { PostsListService } from '../postsList/postsList.service';
import { AppState } from '../../../app/app.reducers';
import { Meta, Post } from '../postsList/postsList.model';

@Component({
  selector: 'pagination-component',
  styleUrls: ['./pagination.component.scss'],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit, OnDestroy {

  private posts$: Observable<Post[]>;
  private alive = true;

  constructor(
    private store: Store<AppState>
  ) { 
    this.posts$ = this.store.select(state => state.postsList.posts);
  }

  ngOnInit() {
    this.watchPostsChange();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private watchPostsChange() {
    /*
    this.posts$
    .pipe(takeWhile(() => this.alive))
    .subscribe(posts => this.meta = posts.meta);
    */
  }

}
