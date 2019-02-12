import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ContentState } from '../../store/content.reducers';
import { PostContentDTO, CommentDTO } from '../../../../shared/clients/api/api.model';
import { selectComments } from './store/comments.selectors';
import { selectPost } from '../singlePost/store/singlePost.selectors';
import { GetComments } from './store/comments.actions';

@Component({
  selector: 'comments-component',
  styleUrls: ['./comments.component.scss'],
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit, OnDestroy {

  post$: Observable<PostContentDTO>;
  comments$: Observable<CommentDTO[]>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<ContentState>
  ) {
    this.post$ = this.store.select(selectPost);
    this.comments$ = this.store.select(selectComments);
  }

  ngOnInit() {
    this.getComments();
  }

  private getComments() {
    this.post$
      .pipe(takeUntil(this.destroy$))
      .subscribe((post: PostContentDTO) => this.store.dispatch(new GetComments(post.id)));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
