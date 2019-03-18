import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { take, skip, tap } from 'rxjs/operators';

import { ContentState } from '../../store/content.reducers';
import { PostContentDTO, CommentDTO } from '../../../../shared/clients/backend/backend.model';
import { selectComments } from './store/comments.selectors';
import { selectPost } from '../singlePost/store/singlePost.selectors';
import { GetComments, AddComment } from './store/comments.actions';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';

@Component({
  selector: 'comments-container',
  template: `
    <comments-component [post$]="post$"
                        [comments$]="comments$"
                        (onFormSubmit)="addNewComment($event)">
    </comments-component>
  `
})
export class CommentsContainer implements OnInit {

  post$: Observable<PostContentDTO>;
  comments$: Observable<CommentDTO[]>;

  constructor(
    private store: Store<ContentState>,
    private commentsService: CommentsService
  ) {
    this.post$ = this.store.select(selectPost);
    this.comments$ = this.store.select(selectComments);
  }

  ngOnInit() {
    this.getComments();
  }

  private getComments() {
    this.post$
      .pipe(take(1))
      .subscribe((post: PostContentDTO) => this.store.dispatch(new GetComments(post.id)));
  }

  addNewComment(comment: Comment) {
    this.commentsService.removeEmptyValues(comment);
    this.store.dispatch(new AddComment(comment));
  }

}
