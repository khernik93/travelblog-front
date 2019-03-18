import { Action } from '@ngrx/store';
import { SwiperDTO } from '../../../../../shared/clients/backend/backend.model';

export enum SwiperActionTypes {
  GetPhotos = '[Swiper] Get photos',
  SetPhotos = '[Swiper] Set photos'
}

export class GetPhotos implements Action {
  readonly type = SwiperActionTypes.GetPhotos;

  constructor() { }
}

export class SetPhotos implements Action {
  readonly type = SwiperActionTypes.SetPhotos;

  constructor(public photos: SwiperDTO) { }
}

export type SwiperActions = GetPhotos
  | SetPhotos;
