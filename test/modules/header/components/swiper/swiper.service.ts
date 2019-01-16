import { SwiperService } from '../../../../../src/modules/header/components/swiper/swiper.service';
import { TransferHttpService } from '../../../../../src/shared/services/transfer-http.service';

describe('SwiperService', () => {

  let swiperService: any;
  let transferHttpService: jasmine.SpyObj<TransferHttpService>;

  beforeEach(() => {
    transferHttpService = jasmine.createSpyObj('TransferHttpService', ['get']);
    swiperService = new SwiperService(<any> transferHttpService);
  });

  it('should call TransferHttpService on calling getPhotos method', () => {
    swiperService.getPhotos();
    expect(transferHttpService.get).toHaveBeenCalled();
  });

});
