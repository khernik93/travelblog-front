import * as swiperActions from '../../../../../src/modules/content/components/swiper/swiper.actions';
import { swiperReducer, initialState } from '../../../../../src/modules/content/components/swiper/swiper.reducer';

describe('SwiperReducer', () => {

  it('should set photos', () => {
    const photos: any = {
      tab1: ['photo1', 'photo2'], 
      tab2: []
    };
    const action = new swiperActions.SetPhotos(photos);
    const result = swiperReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      photos: photos
    });
  });

});
