import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { exhaustMap, catchError, map, take, concatMap, debounceTime } from 'rxjs/operators';
import { PostsDTO, MetaDTO, PostContentDTO, TabDTO } from '../../../../../shared/clients/api/api.model';
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
  ClearPosts,
  DeletePostSuccess,
  DeletePostError,
  EditPostSuccess,
  EditPostError,
  AddNewPostError,
  AddNewPostSuccess
} from './postsList.actions';
import { SetSuccess } from '../../../../app/containers/notification/store/notification.actions';
import { HeaderState } from '../../../../header/store/header.reducers';
import { selectTabs } from '../../../../header/containers/menu/store/menu.selectors';

@Injectable()
export class PostsListEffects {

  @Effect()
  getPostsInitial$: Observable<any> = this.actions$
    .pipe(
      ofType(PostsListActionTypes.GetPostsInitial),
      concatMap((action: any) => ([
        new ClearPosts(),
        new GetPosts(
          action.selectedTab,
          this.postsListService.DEFAULT_START,
          this.postsListService.DEFAULT_END
        )
      ]))
    );

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

  @Effect()
  addNewPost$: Observable<any> = this.actions$
    .pipe(
      ofType(PostsListActionTypes.AddNewPost),
      exhaustMap((action: any) => (
        this.store.select(selectTabs)
          .pipe(
            take(1),
            map((tabs: TabDTO[]) => tabs.filter(tab => tab.id === action.post.tabId)[0]),
            map((tab: TabDTO) => this.postsListService.transformPostIntoPostContentDTO(action.post, tab))
          )
      )),
      exhaustMap((postContentDTO: PostContentDTO) => (
        this.apiClient.addNewPost(postContentDTO)
          .pipe(
            map(() => new AddNewPostSuccess()),
            catchError(() => of(new AddNewPostError()))
          )
      ))
    );
  
  @Effect()
  addNewPostSuccess$: Observable<any> = this.actions$
    .pipe(
      ofType(PostsListActionTypes.AddNewPostSuccess),
      map(() => new SetSuccess("The post was added successfully!"))
    );

  @Effect()
  editPost$: Observable<any> = this.actions$
    .pipe(
      ofType(PostsListActionTypes.EditPost),
      exhaustMap((action: any) => (
        this.store.select(selectTabs)
          .pipe(
            take(1),
            map((tabs: TabDTO[]) => tabs.filter(tab => tab.id === action.post.tabId)[0]),
            map((tab: TabDTO) => this.postsListService.transformPostIntoPostContentDTO(action.post, tab))
          )
      )),
      exhaustMap((postContentDTO: PostContentDTO) => (
        this.apiClient.updatePost(postContentDTO)
          .pipe(
            map(() => new EditPostSuccess()),
            catchError(() => of(new EditPostError()))
          )
      ))
    );
  
  @Effect()
  editPostSuccess$: Observable<any> = this.actions$
    .pipe(
      ofType(PostsListActionTypes.EditPostSuccess),
      map(() => new SetSuccess('Post edited successfully!'))
    );

  @Effect()
  deletePost$: Observable<any> = this.actions$
    .pipe(
      ofType(PostsListActionTypes.DeletePost),
      exhaustMap((action: any) => (
        this.apiClient.deletePost(action.id)
          .pipe(
            map(() => new DeletePostSuccess()),
            catchError(() => of(new DeletePostError))
          )
      ))
    );
  
  @Effect()
  deletePostSuccess$: Observable<any> = this.actions$
    .pipe(
      ofType(PostsListActionTypes.DeletePostSuccess),
      map(() => new SetSuccess('Post deleted successfully!'))
    );

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient,
    private store: Store<HeaderState | ContentState>,
    private postsListService: PostsListService
  ) { }

}
