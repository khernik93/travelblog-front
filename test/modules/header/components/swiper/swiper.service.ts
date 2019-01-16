import { SwiperService } from '../../../../../src/modules/header/components/swiper/swiper.service';
import { TransferHttpService } from '../../../../../src/shared/services/transfer-http.service';
import { TestBed } from '@angular/core/testing';

describe('SwiperService', () => {

  let swiperService: any;
  let transferHttpService: jasmine.SpyObj<TransferHttpService>;

  beforeEach(() => {
    transferHttpService = jasmine.createSpyObj('TransferHttpService', ['get']);
    TestBed.configureTestingModule({
      providers: [
        SwiperService,
        { provide: TransferHttpService, useValue: transferHttpService }
      ]
    });
    swiperService = TestBed.get(SwiperService);
  });

  it('should call TransferHttpService on calling getPhotos method', () => {
    swiperService.getPhotos();
    expect(transferHttpService.get).toHaveBeenCalled();
  });

});
