import * as swiperActions from '../../../../../src/modules/header/components/swiper/swiper.actions';
import { swiperReducer, initialState } from '../../../../../src/modules/header/components/swiper/swiper.reducer';
import photosResponse from '../../../../utils/responses/photos.response';

describe('SwiperReducer', () => {

  it(`
    WHEN SetPhotos action is dispatched
    THEN all photos should be stored in the store properly
  `, () => {
    const action = new swiperActions.SetPhotos(photosResponse);
    const result = swiperReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      photos: photosResponse
    });
  });

});
