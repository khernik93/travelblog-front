import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { BackendClient } from '../../../../../shared/clients/backend/backend.client';

import {
  AdminPostsListActionTypes,
  DeletePostSuccess,
  DeletePostError,
} from './adminPostsList.actions';
import { SetSuccess } from '../../../../app/containers/notification/store/notification.actions';

@Injectable()
export class AdminPostsListEffects {

  @Effect()
  deletePost$: Observable<any> = this.actions$
    .pipe(
      ofType(AdminPostsListActionTypes.DeletePost),
      exhaustMap((action: any) => (
        this.apiClient.deletePost(action.id)
          .pipe(
            map(() => new DeletePostSuccess()),
            catchError(() => of(new DeletePostError))
          )
      ))
    );
  
  @Effect()
  deletePostSuccess$: Observable<any> = this.actions$
    .pipe(
      ofType(AdminPostsListActionTypes.DeletePostSuccess),
      map(() => new SetSuccess('Post deleted successfully!'))
    );

  constructor(
    private actions$: Actions,
    private apiClient: BackendClient
  ) { }

}
