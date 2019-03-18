import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';
import { RecentPostsActionTypes, SetRecentPosts } from './recentPosts.actions';
import { PostContentDTO } from '../../../../../shared/clients/backend/backend.model';
import { BackendClient } from '../../../../../shared/clients/backend/backend.client';

@Injectable()
export class RecentPostsEffects {

  @Effect()
  getRecentPosts$: Observable<any> = this.actions$
    .pipe(
      ofType(RecentPostsActionTypes.GetRecentPosts),
      exhaustMap(() => (
        this.apiClient.getRecentPosts()
          .pipe(
            map((posts: PostContentDTO[]) => new SetRecentPosts(posts))
          )
      ))
    );

  constructor(
    private actions$: Actions,
    private apiClient: BackendClient
  ) { }

}
