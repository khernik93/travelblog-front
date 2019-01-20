import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as swiperActions from './swiper.actions';
import { SwiperService } from './swiper.service';

@Injectable()
export class SwiperEffects {

  constructor(
    private actions$: Actions,
    private swiperService: SwiperService
  ) { }

  @Effect()
  getPhotos$: Observable<any> = this.actions$
    .pipe(
      ofType(swiperActions.SwiperActionTypes.GetPhotos),
      switchMap(() => {
        return this.swiperService.getPhotos()
          .pipe(
            map((photos: Map<string, string[]>) => new swiperActions.SetPhotos(photos))
          );
      })
    );

}
