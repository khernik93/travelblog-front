import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { exhaustMap, catchError, map, take, concatMap, debounceTime, filter, tap, switchMap } from 'rxjs/operators';
import { PostsDTO, MetaDTO, TabDTO } from '../../../../../shared/clients/api/api.model';
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
  GetPostsOnScroll,
  ClearPosts
} from './postsList.actions';
import { selectTabs } from '../../../../header/components/menu/store/menu.selectors';
import { SelectTab } from '../../../../header/components/menu/store/menu.actions';

@Injectable()
export class PostsListEffects {

  @Effect()
  getPostsOnRouteChange$: Observable<any> = this.actions$
    .pipe(
      ofType(PostsListActionTypes.GetPostsOnRouteChange),
      switchMap((action: any) => this.getTabByTabId(action.tabId)),
      exhaustMap((tab: TabDTO) => [
        new SelectTab(tab),
        new ClearPosts(),
        new GetPosts(tab, this.postsListService.DEFAULT_START, this.postsListService.DEFAULT_END)
      ])
    );

  private getTabByTabId(tabId: number): Observable<TabDTO> {
    return this.store.select(selectTabs)
      .pipe(
        filter((tabs: TabDTO[]) => tabs.length > 0),
        map((tabs: TabDTO[]) => tabs.filter(tab => tab.id == tabId)[0] || tabs[0])
      )
  }

  @Effect()
  tryToGetPostsOnScroll$: Observable<any> = this.actions$
    .pipe(
      ofType(PostsListActionTypes.TryToGetPostsOnScroll),
      exhaustMap((action: any) => (
        this.store.select(selectCanScroll)
          .pipe(
            take(1),
            map((canScroll: boolean) => ( // dispatched here for easier access to action
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
            map((meta: MetaDTO) => new GetPosts( // dispatched here for easier access to action
              action.selectedTab, 
              this.postsListService.getNextStart(meta),
              this.postsListService.getNextEnd(meta)
            ))
          )
      ))
    );

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
            concatMap((response: PostsDTO) => ([
              new GetPostsSuccess(),
              new SetPosts(response.content, response.meta)
            ])),
            catchError(() => of(new GetPostsError()))
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
