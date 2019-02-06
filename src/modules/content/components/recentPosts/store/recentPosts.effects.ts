import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';
import { RecentPostsActionTypes, SetRecentPosts } from './recentPosts.actions';
import { Post, ApiResponse } from '../../../../../shared/clients/api/api.model';
import { ApiClient } from '../../../../../shared/clients/api/api.client';

@Injectable()
export class RecentPostsEffects {

  @Effect()
  getRecentPosts$: Observable<any> = this.actions$
    .pipe(
      ofType(RecentPostsActionTypes.GetRecentPosts),
      exhaustMap(() => (
        this.apiClient.getRecentPosts()
          .pipe(
            map((response: ApiResponse<Post[]>) => new SetRecentPosts(response))
          )
      ))
    );

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient
  ) { }

}
