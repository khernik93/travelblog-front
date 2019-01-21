import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as recentPostsActions from './recentPosts.actions';
import { RecentPostsService } from './recentPosts.service';
import { Post } from '../../../../shared/clients/api.model';

@Injectable()
export class RecentPostsEffects {

  constructor(
    private actions$: Actions,
    private recentPostsService: RecentPostsService
  ) { }

  @Effect()
  getRecentPosts$: Observable<any> = this.actions$
    .pipe(
      ofType(recentPostsActions.RecentPostsActionTypes.GetRecentPosts),
      switchMap(() => {
        return this.recentPostsService.getRecentPosts()
          .pipe(
            map((recentPosts: Post[]) => new recentPostsActions.SetRecentPosts(recentPosts))
          );
      })
    );

}
