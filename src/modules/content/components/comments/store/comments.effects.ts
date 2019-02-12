import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';

import { CommentsActionTypes, SetComments } from './comments.actions';
import { CommentDTO } from '../../../../../shared/clients/api/api.model';
import { ApiClient } from '../../../../../shared/clients/api/api.client';

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

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient
  ) { }

}
