import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as singlePostActions from './singlePost.actions';
import { SinglePostService } from './singlePost.service';
import { Post } from '../../../../shared/clients/api.model';

@Injectable()
export class SinglePostEffects {

  constructor(
    private actions$: Actions,
    private singlePostService: SinglePostService
  ) { }

  @Effect()
  getPost$: Observable<any> = this.actions$
    .pipe(
      ofType(singlePostActions.SinglePostActionTypes.GetPost),
      switchMap((action: any) => {
        return this.singlePostService.getPost(action.id)
          .pipe(
            map((post: Post) => new singlePostActions.SetPost(post))
          );
      })
    );

}
