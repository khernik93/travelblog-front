import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as postsListActions from './postsList.actions';
import { PostsPaginable, ApiResponse } from '../../../../../shared/clients/api.model';
import { ApiClient } from '../../../../../shared/clients/api.client';

@Injectable()
export class PostsListEffects {

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient
  ) { }

  @Effect()
  getPosts$: Observable<any> = this.actions$
    .pipe(
      ofType(postsListActions.PostsListActionTypes.GetPosts),
      switchMap((action: any) => {
        return this.apiClient.getPosts(action.selectedTab)
          .pipe(
            map((response: ApiResponse<PostsPaginable>) => {
              return new postsListActions.SetPosts(response.data.content);
            })
          );
      })
    );

}
