import { SwiperActions, SwiperActionTypes } from './swiper.actions';

export interface SwiperState {
  photos: Map<string, string[]>
};

export const initialState: SwiperState = {
  photos: null
};

export const swiperReducer = (state = initialState, action: SwiperActions): SwiperState => {
  
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
