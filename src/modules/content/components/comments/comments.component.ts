import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ContentState } from '../../store/content.reducers';
import { PostContentDTO, CommentDTO } from '../../../../shared/clients/api/api.model';
import { selectComments } from './store/comments.selectors';
import { selectPost } from '../singlePost/store/singlePost.selectors';
import { GetComments, AddComment } from './store/comments.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentsService } from './comments.service';

@Component({
  selector: 'comments-component',
  styleUrls: ['./comments.component.scss'],
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit, OnDestroy {

  post$: Observable<PostContentDTO>;
  comments$: Observable<CommentDTO[]>;
  addNewCommentForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<ContentState>,
    private commentsService: CommentsService
  ) {
    this.post$ = this.store.select(selectPost);
    this.comments$ = this.store.select(selectComments);
  }

  ngOnInit() {
    this.addNewCommentForm = this.buildAddNewCommentForm();
    this.getComments();
  }

  private buildAddNewCommentForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      content: new FormControl('', Validators.required),
      email: new FormControl('')
    });
  }

  private getComments() {
    this.post$
      .pipe(takeUntil(this.destroy$))
      .subscribe((post: PostContentDTO) => this.store.dispatch(new GetComments(post.id)));
  }

  addNewComment() {
    const comment = this.addNewCommentForm.value;
    this.commentsService.removeEmptyValues(comment);
    this.store.dispatch(new AddComment(comment));
  }

  isInvalid(control: string): boolean {
    const isValid = this.addNewCommentForm.get(control).valid;
    const isTouched = this.addNewCommentForm.get(control).touched;
    return !isValid && isTouched;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
