import { TestBed } from '@angular/core/testing';

import { SwiperService } from '../../../../../src/modules/header/components/swiper/swiper.service';
import { TransferHttpService } from '../../../../../src/shared/services/transferHttp.service';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';

describe('SwiperService', () => {

  let swiperService: SwiperService;
  let transferHttpService: jasmine.SpyObj<TransferHttpService>;

  beforeEach(() => {

    transferHttpService = SharedStubs.getTransferHttpService();

    TestBed.configureTestingModule({
      providers: [
        SwiperService,
        { provide: TransferHttpService, useValue: transferHttpService }
      ]
    });

  });

  beforeEach(() => {
    swiperService = TestBed.get(SwiperService);
  });

  it(`
    WHEN there is a call to getPhotos method
    THEN transferHttpService.get method should be called
  `, () => {
    swiperService.getPhotos();
    expect(transferHttpService.get).toHaveBeenCalled();
  });

});
