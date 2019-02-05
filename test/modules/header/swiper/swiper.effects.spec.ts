import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import cloneDeep from 'lodash-es/cloneDeep';

import { SwiperEffects } from '../../../../src/modules/header/components/swiper/store/swiper.effects';
import { GetPhotos, SetPhotos } from '../../../../src/modules/header/components/swiper/store/swiper.actions';
import { TestActions, getActions } from '../../../utils/mocks/testActions';
import { PhotosResponse } from '../../../utils/responses/photos.response';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { ApiClient } from '../../../../src/shared/clients/api.client';

describe('SwiperEffects', () => {

  let apiClient: jasmine.SpyObj<ApiClient>;

  let actions: TestActions;
  let effects: SwiperEffects;
  let ClonedPhotosResponse: typeof PhotosResponse;

  beforeEach(() => {
    apiClient = SharedStubs.getApiClientStub();

    TestBed.configureTestingModule({
      providers: [
        SwiperEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ApiClient, useValue: apiClient }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(SwiperEffects);
  });

  beforeEach(() => {
    ClonedPhotosResponse = cloneDeep(PhotosResponse);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN GetPhotos action is dispatched
    THEN swiperService.getTabs method should be executed
    AND SetPhotos action should be dispatched with fetched photos
  `, () => {
    const action = new GetPhotos();
    const outcome = new SetPhotos(ClonedPhotosResponse);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: ClonedPhotosResponse });
    const expected = cold('--b', { b: outcome });
    apiClient.getPhotos.and.returnValue(response);
    expect(effects.getPhotos$).toBeObservable(expected);
  });

});
