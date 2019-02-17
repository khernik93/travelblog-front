import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { exhaustMap, catchError, concatMap, tap } from 'rxjs/operators';
import { PostsDTO } from '../../../../../shared/clients/api/api.model';
import { ApiClient } from '../../../../../shared/clients/api/api.client';

import { 
  SetPosts,
  GetPostsError,
  GetPostsSuccess,
  ManagePostsActionTypes
} from './managePosts.actions';

@Injectable()
export class ManagePostsEffects {

  @Effect()
  getPosts$: Observable<any> = this.actions$
    .pipe(
      ofType(ManagePostsActionTypes.GetPosts),
      exhaustMap((action: any) => (
        this.apiClient.getPosts(action.selectedTabId, {
          start: 0,
          end: 9999
        })
          .pipe(
            concatMap((response: PostsDTO) => ([
              new GetPostsSuccess(),
              new SetPosts(response.content)
            ])),
            catchError(() => of(new GetPostsError()))
          )
      ))
    );

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient
  ) { }

}
