import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as recentPostsActions from './recentPosts.actions';
import { Post, ApiResponse } from '../../../../../shared/clients/api.model';
import { ApiClient } from '../../../../../shared/clients/api.client';

@Injectable()
export class RecentPostsEffects {

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient
  ) { }

  @Effect()
  getRecentPosts$: Observable<any> = this.actions$
    .pipe(
      ofType(recentPostsActions.RecentPostsActionTypes.GetRecentPosts),
      switchMap(() => {
        return this.apiClient.getRecentPosts()
          .pipe(
            map((response: ApiResponse<Post[]>) => {
              return new recentPostsActions.SetRecentPosts(response.data);
            })
          );
      })
    );

}
