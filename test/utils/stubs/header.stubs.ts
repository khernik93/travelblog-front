import { SwiperService } from '../../../src/modules/header/containers/swiper/swiper.service';

export class HeaderStubs {

  static swiperService(): jasmine.SpyObj<SwiperService> {
    return jasmine.createSpyObj('SwiperService', ['configuration']);
  }
  
};
