import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, Scheduler } from 'rxjs';
import { exhaustMap, catchError, map, take, concatMap, debounceTime } from 'rxjs/operators';
import { PostsPaginable, Meta } from '../../../../../shared/clients/api/api.model';
import { ApiClient } from '../../../../../shared/clients/api/api.client';
import { Store } from '@ngrx/store';
import { ContentState } from '../../../store/content.reducers';
import { selectCanScroll, selectMeta } from './postsList.selectors';
import { PostsListService } from '../postsList.service';

import { 
  PostsListActionTypes, 
  GetPosts,
  SetPosts,
  GetPostsError,
  GetPostsSuccess,
  GetPostsOnScroll
} from './postsList.actions';

@Injectable()
export class PostsListEffects {

  @Effect()
  getPosts$: Observable<any> = this.actions$
    .pipe(
      ofType(PostsListActionTypes.GetPosts),
      exhaustMap((action: any) => (
        this.apiClient.getPosts(action.selectedTab.id, { 
          start: action.start, 
          end: action.end 
        })
          .pipe(
            concatMap((response: PostsPaginable) => ([
              new GetPostsSuccess(),
              new SetPosts(response.content, response.meta)
            ])),
            catchError(() => of(new GetPostsError()))
          )
      ))
    );

  @Effect()
  tryToGetPostsOnScroll$: Observable<any> = this.actions$
    .pipe(
      ofType(PostsListActionTypes.TryToGetPostsOnScroll),
      exhaustMap((action: any) => (
        this.store.select(selectCanScroll)
          .pipe(
            take(1),
            map((canScroll: boolean) => (
              (canScroll) ? 
                new GetPostsOnScroll(action.selectedTab) :
                new GetPostsSuccess() // no need to scroll more
            ))
          )
      ))
    );

  @Effect()
  getPostsOnScroll$: Observable<any> = this.actions$
    .pipe(
      ofType(PostsListActionTypes.GetPostsOnScroll),
      debounceTime(this.postsListService.SCROLL_DEBOUNCE),
      exhaustMap((action: any) => (
        this.store.select(selectMeta)
          .pipe(
            take(1),
            map((meta: Meta) => new GetPosts(
              action.selectedTab, 
              this.postsListService.getNextStart(meta),
              this.postsListService.getNextEnd(meta)
            ))
          )
      ))
    );

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient,
    private store: Store<ContentState>,
    private postsListService: PostsListService
  ) { }

}
