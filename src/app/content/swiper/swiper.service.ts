import { Injectable } from '@angular/core';

import { TransferHttp } from '../../shared/transfer-http/transfer-http';

const urls = {
  swiperPhotos: '/swiperphotos'
};

@Injectable()
export class SwiperService {

  constructor(
    private transferHttp: TransferHttp
  ) { }

  getPhotos() {
    return this.transferHttp.get(urls.swiperPhotos);
  }

}
