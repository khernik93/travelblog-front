import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';
import { SwiperActionTypes, SetPhotos } from './swiper.actions';
import { SwiperDTO } from '../../../../../shared/clients/backend/backend.model';
import { BackendClient } from '../../../../../shared/clients/backend/backend.client';

@Injectable()
export class SwiperEffects {

  @Effect()
  getPhotos$: Observable<any> = this.actions$
    .pipe(
      ofType(SwiperActionTypes.GetPhotos),
      exhaustMap(() => (
        this.apiClient.getPhotos()
          .pipe(
            map((photos: SwiperDTO) => new SetPhotos(photos))
          )
      ))
    );

  constructor(
    private actions$: Actions,
    private apiClient: BackendClient
  ) { }

}
