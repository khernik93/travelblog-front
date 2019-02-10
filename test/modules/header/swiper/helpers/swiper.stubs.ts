import { SwiperService } from '../../../../../src/modules/header/components/swiper/swiper.service';

export class SwiperStubs {

  static getSwiperServiceStub(): jasmine.SpyObj<SwiperService> {
    return jasmine.createSpyObj('SwiperService', ['configuration']);
  }

};
