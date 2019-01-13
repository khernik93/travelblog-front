import * as assert from 'assert';
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
    assert.deepEqual(result, {
      ...initialState,
      photos: photos
    });
  });

  it('should get photos - edge cases', () => {
    const photos: any = {};
    const action = new swiperActions.SetPhotos(photos);
    const result = swiperReducer(initialState, action);
    assert.deepEqual(result, {
      ...initialState,
      photos: {}
    });
  });

});
