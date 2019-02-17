import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { exhaustMap, catchError, concatMap } from 'rxjs/operators';
import { PostsDTO } from '../../../../../shared/clients/api/api.model';
import { ApiClient } from '../../../../../shared/clients/api/api.client';

import { 
  SetAdminPosts,
  GetAdminPostsError,
  GetAdminPostsSuccess,
  AdminPostsListActionTypes
} from './adminPostsList.actions';
import { AdminPostsListService } from '../adminPostsList.service';

@Injectable()
export class AdminPostsListEffects {

  @Effect()
  getAdminPosts$: Observable<any> = this.actions$
    .pipe(
      ofType(AdminPostsListActionTypes.GetAdminPosts),
      exhaustMap((action: any) => (
        this.apiClient.getPosts(action.selectedTabId, {
          start: this.adminPostsListService.POSTS_START,
          end: this.adminPostsListService.POSTS_END
        })
          .pipe(
            concatMap((response: PostsDTO) => ([
              new GetAdminPostsSuccess(),
              new SetAdminPosts(response.content)
            ])),
            catchError(() => of(new GetAdminPostsError()))
          )
      ))
    );

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient,
    private adminPostsListService: AdminPostsListService
  ) { }

}
