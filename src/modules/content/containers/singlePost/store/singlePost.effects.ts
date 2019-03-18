import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, exhaustMap, tap } from 'rxjs/operators';

import { SinglePostActionTypes, SetPost } from './singlePost.actions';
import { PostContentDTO } from '../../../../../shared/clients/backend/backend.model';
import { BackendClient } from '../../../../../shared/clients/backend/backend.client';

@Injectable()
export class SinglePostEffects {

  @Effect()
  getPost$: Observable<any> = this.actions$
    .pipe(
      ofType(SinglePostActionTypes.GetPost),
      exhaustMap((action: any) => (
        this.apiClient.getPost(action.id)
          .pipe(
            map((post: PostContentDTO) => new SetPost(post))
          )
      ))
    );

  constructor(
    private actions$: Actions,
    private apiClient: BackendClient
  ) { }

}
