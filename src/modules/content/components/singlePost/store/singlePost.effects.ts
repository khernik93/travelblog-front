import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as singlePostActions from './singlePost.actions';
import { Post, ApiResponse } from '../../../../../shared/clients/api.model';
import { ApiClient } from '../../../../../shared/clients/api.client';

@Injectable()
export class SinglePostEffects {

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient
  ) { }

  @Effect()
  getPost$: Observable<any> = this.actions$
    .pipe(
      ofType(singlePostActions.SinglePostActionTypes.GetPost),
      switchMap((action: any) => {
        return this.apiClient.getPost(action.id)
          .pipe(
            map((response: ApiResponse<Post>) => {
              return new singlePostActions.SetPost(response.data);
            })
          );
      })
    );

}
