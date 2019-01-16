import { Injectable } from '@angular/core';

import { TransferHttpService } from '../../../../shared/services/transfer-http.service';

const urls = {
  swiperPhotos: '/swiperphotos'
};

@Injectable()
export class SwiperService {

  constructor(
    private transferHttp: TransferHttpService
  ) { }

  getPhotos() {
    return this.transferHttp.get(urls.swiperPhotos);
  }

}