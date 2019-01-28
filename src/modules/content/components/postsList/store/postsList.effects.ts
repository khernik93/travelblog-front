import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, timer, of } from 'rxjs';
import { exhaustMap, debounce, catchError, mergeMap, map, takeWhile, take } from 'rxjs/operators';

import * as postsListActions from './postsList.actions';
import { PostsPaginable, ApiResponse } from '../../../../../shared/clients/api.model';
import { ApiClient } from '../../../../../shared/clients/api.client';
import { Store } from '@ngrx/store';
import { ContentState } from '../../../store/content.reducers';
import { selectCanScroll } from './postsList.selectors';

@Injectable()
export class PostsListEffects {

  @Effect()
  getPosts$: Observable<any> = this.actions$
    .pipe(
      ofType(postsListActions.PostsListActionTypes.GetPosts),
      exhaustMap((action: any) => this.apiClient.getPosts(action.selectedTab)),
      mergeMap((response: ApiResponse<PostsPaginable>) => ([
        new postsListActions.SetPosts(response.data.content, response.data.meta),
        new postsListActions.GetPostsSuccess()
      ])),
      catchError(() => of(new postsListActions.GetPostsError()))
    );

  @Effect()
  getPostsOnScroll$: Observable<any> = this.actions$
    .pipe(
      ofType(postsListActions.PostsListActionTypes.GetPostsOnScroll),
      exhaustMap((action: any) => {
        return this.store.select(selectCanScroll)
          .pipe(
            take(1), 
            map((canScroll: boolean) => ({ canScroll, action }))
          );
      }),
      takeWhile((result: any) => result.canScroll),
      debounce(() => timer(2000)),
      map((result: any) => new postsListActions.GetPosts(result.action.selectedTab))
    );

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient,
    private store: Store<ContentState>
  ) { }

}
