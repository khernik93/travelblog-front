import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';

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
      exhaustMap((action: any) => this.apiClient.getPost(action.id)),
      map((response: ApiResponse<Post>) => new singlePostActions.SetPost(response))
    );

}
