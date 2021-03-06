import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, filter, catchError, take } from 'rxjs/operators';

import { CommentsActionTypes, SetComments, AddCommentSuccess, AddCommentError } from './comments.actions';
import { CommentDTO, PostContentDTO } from '../../../../../shared/clients/backend/backend.model';
import { BackendClient } from '../../../../../shared/clients/backend/backend.client';
import { Store } from '@ngrx/store';
import { ContentState } from '../../../store/content.reducers';
import { selectPost } from '../../singlePost/store/singlePost.selectors';
import { Comment } from '../comments.model';
import { SetSuccess } from '../../../../app/containers/notification/store/notification.actions';

@Injectable()
export class CommentsEffects {

  @Effect()
  getComments$: Observable<any> = this.actions$
    .pipe(
      ofType(CommentsActionTypes.GetComments),
      exhaustMap((action: any) => (
        this.apiClient.getComments(action.postId)
          .pipe(
            map((comments: CommentDTO[]) => new SetComments(comments))
          )
      ))
    );

  @Effect()
  addComment$: Observable<any> = this.actions$
    .pipe(
      ofType(CommentsActionTypes.AddComment),
      exhaustMap((action: any) => (
        this.store.select(selectPost)
          .pipe(
            take(1),
            map((post: PostContentDTO) => ({ postId: post.id, comment: action.comment }))
          )
      )),
      exhaustMap((result: {postId: number, comment: Comment}) => (
        this.apiClient.addComment(result.comment, result.postId)
          .pipe(
            map((comment: CommentDTO) => new AddCommentSuccess(comment)),
            catchError(() => of(new AddCommentError()))
          )
      ))
    );

  @Effect()
  addCommentSuccess$: Observable<any> = this.actions$
    .pipe(
      ofType(CommentsActionTypes.AddCommentSuccess),
      map(() => new SetSuccess("Comemnt added"))
    );

  constructor(
    private actions$: Actions,
    private apiClient: BackendClient,
    private store: Store<ContentState>
  ) { }

}
