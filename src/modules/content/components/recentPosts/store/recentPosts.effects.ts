import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';

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
      exhaustMap(() => this.apiClient.getRecentPosts()),
      map((response: ApiResponse<Post[]>) => new recentPostsActions.SetRecentPosts(response))
    );

}
