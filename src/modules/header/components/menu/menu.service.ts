import { Injectable } from '@angular/core';

import { TransferHttpService } from '../../../../shared/services/transfer-http.service';

const urls = {
  tabs: '/countries'
};

@Injectable()
export class MenuService {

  constructor(
    private transferHttp: TransferHttpService
  ) { }

  getTabs() {
    return this.transferHttp.get(urls.tabs);
  }

}
