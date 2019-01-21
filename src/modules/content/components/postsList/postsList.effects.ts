import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as postsListActions from './postsList.actions';
import { PostsListService } from './postsList.service';
import { PostsPaginable, Post } from '../../../../shared/clients/api.model';

@Injectable()
export class PostsListEffects {

  constructor(
    private actions$: Actions,
    private postsListService: PostsListService
  ) { }

  @Effect()
  getPosts$: Observable<any> = this.actions$
    .pipe(
      ofType(postsListActions.PostsListActionTypes.GetPosts),
      switchMap((action: any) => {
        return this.postsListService.getPosts(action.selectedTab)
          .pipe(
            map((response: PostsPaginable) => response.content),
            map((posts: Post[]) => new postsListActions.SetPosts(posts))
          );
      })
    );

}
