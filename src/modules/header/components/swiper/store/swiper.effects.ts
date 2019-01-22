import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as swiperActions from './swiper.actions';
import { Photos, ApiResponse } from '../../../../../shared/clients/api.model';
import { ApiClient } from '../../../../../shared/clients/api.client';

@Injectable()
export class SwiperEffects {

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient
  ) { }

  @Effect()
  getPhotos$: Observable<any> = this.actions$
    .pipe(
      ofType(swiperActions.SwiperActionTypes.GetPhotos),
      switchMap(() => {
        return this.apiClient.getPhotos()
          .pipe(
            map((response: ApiResponse<Photos>) => {
              return new swiperActions.SetPhotos(response.data);
            })
          );
      })
    );

}
