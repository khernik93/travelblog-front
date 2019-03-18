import { SwiperActions, SwiperActionTypes } from './swiper.actions';
import { SwiperDTO } from '../../../../../shared/clients/backend/backend.model';

export interface SwiperState {
  photos: SwiperDTO
};

export const initialState: SwiperState = {
  photos: null
};

export function swiperReducer (state = initialState, action: SwiperActions): SwiperState {
  
  switch (action.type) {

    case SwiperActionTypes.SetPhotos: {
      return {
        ...state,
        photos: action.photos
      };
    }

    default: {
      return state;
    }
  }

};
