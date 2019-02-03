import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, timer, of } from 'rxjs';
import { exhaustMap, debounce, catchError, mergeMap, map, takeWhile, take, tap, concatMap } from 'rxjs/operators';

import * as postsListActions from './postsList.actions';
import { PostsPaginable, ApiResponse, Meta } from '../../../../../shared/clients/api.model';
import { ApiClient } from '../../../../../shared/clients/api.client';
import { Store } from '@ngrx/store';
import { ContentState } from '../../../store/content.reducers';
import { selectCanScroll, selectMeta } from './postsList.selectors';
import { PostsListService } from '../postsList.service';

@Injectable()
export class PostsListEffects {

  @Effect()
  getPosts$: Observable<any> = this.actions$
    .pipe(
      ofType(postsListActions.PostsListActionTypes.GetPosts),
      exhaustMap((action: any) => this.apiClient.getPosts(action.selectedTab.id, { 
        start: action.start, 
        end: action.end 
      })),
      concatMap((response: ApiResponse<PostsPaginable>) => ([
        new postsListActions.GetPostsSuccess(),
        new postsListActions.SetPosts(response.content, response.meta)
      ])),
      catchError(() => of(new postsListActions.GetPostsError()))
    );

  @Effect()
  tryToGetPostsOnScroll$: Observable<any> = this.actions$
    .pipe(
      ofType(postsListActions.PostsListActionTypes.TryToGetPostsOnScroll),
      exhaustMap((action: any) => this.store.select(selectCanScroll)
        .pipe(take(1), map((canScroll: boolean) => ({ canScroll, action })))
      ),
      map((result: any) => (
        (result.canScroll) ? 
          new postsListActions.GetPostsOnScroll(result.action.selectedTab) :
          new postsListActions.GetPostsSuccess() // no need to scroll more
      )),
      catchError(() => of(new postsListActions.GetPostsError()))
    );

  @Effect()
  getPostsOnScroll$: Observable<any> = this.actions$
    .pipe(
      ofType(postsListActions.PostsListActionTypes.GetPostsOnScroll),
      exhaustMap((action: any) => this.store.select(selectMeta)
        .pipe(take(1), map((meta: Meta) => ({ action, meta })))
      ),
      debounce(() => timer(this.postsListService.SCROLL_DEBOUNCE)),
      map((result: any) => new postsListActions.GetPosts(
        result.action.selectedTab, 
        this.postsListService.getNextStart(result.meta),
        this.postsListService.getNextEnd(result.meta)
      )),
      catchError(() => of(new postsListActions.GetPostsError()))
    );

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient,
    private store: Store<ContentState>,
    private postsListService: PostsListService
  ) { }

}
