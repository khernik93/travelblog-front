import { Injectable } from '@angular/core';

import { TransferHttp } from '../../shared/transfer-http/transfer-http';

const urls = {
  tabs: '/countries'
};

@Injectable()
export class MenuService {

  constructor(
    private transferHttp: TransferHttp
  ) { }

  getTabs() {
    return this.transferHttp.get(urls.tabs);
  }

}
