import * as _ from 'lodash';

import * as swiperActions from '../../../../src/modules/header/components/swiper/store/swiper.actions';
import { swiperReducer, initialState } from '../../../../src/modules/header/components/swiper/store/swiper.reducer';
import { PhotosResponse } from '../../../utils/responses/photos.response';

describe('SwiperReducer', () => {

  let ClonedPhotosResponse: typeof PhotosResponse;

  beforeEach(() => {
    ClonedPhotosResponse = _.cloneDeep(PhotosResponse);
  });

  it(`
    WHEN SetPhotos action is dispatched
    THEN all photos should be stored in the store properly
  `, () => {
    const action = new swiperActions.SetPhotos(ClonedPhotosResponse);
    const result = swiperReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      photos: ClonedPhotosResponse
    });
  });

});
