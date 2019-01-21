import { TestBed } from '@angular/core/testing';

import { SwiperService } from '../../../../src/modules/header/components/swiper/swiper.service';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { ApiClient } from '../../../../src/shared/clients/api.client';

describe('SwiperService', () => {

  let swiperService: SwiperService;
  let apiClient: jasmine.SpyObj<ApiClient>;

  beforeEach(() => {

    apiClient = SharedStubs.getApiClientStub();

    TestBed.configureTestingModule({
      providers: [
        SwiperService,
        { provide: ApiClient, useValue: apiClient }
      ]
    });

  });

  beforeEach(() => {
    swiperService = TestBed.get(SwiperService);
  });

  it(`
    WHEN there is a call to getPhotos method
    THEN ApiClient.getPhotos method should be called
  `, () => {
    swiperService.getPhotos();
    expect(apiClient.getPhotos).toHaveBeenCalled();
  });

});
