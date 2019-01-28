import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, timer, of } from 'rxjs';
import { exhaustMap, debounce, catchError, mergeMap, tap, map } from 'rxjs/operators';

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
      exhaustMap((action: any) => this.apiClient.getPosts(action.selectedTab)),
      mergeMap((response: ApiResponse<PostsPaginable>) => ([
        new postsListActions.SetPosts(response.data.content),
        new postsListActions.GetPostsSuccess()
      ])),
      catchError(() => of(new postsListActions.GetPostsError()))
    );

  @Effect()
  getPostsOnScroll$: Observable<any> = this.actions$
    .pipe(
      ofType(postsListActions.PostsListActionTypes.GetPostsOnScroll),
      debounce(() => timer(2000)),
      map((action: any) => new postsListActions.GetPosts(action.selectedTab))
    );

}
