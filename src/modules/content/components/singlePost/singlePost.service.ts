import { Injectable } from '@angular/core';

import { TransferHttpService } from '../../../../shared/services/transferHttp.service';

const urls = {
  post: '/post'
};

@Injectable()
export class SinglePostService {

  constructor(
    private transferHttp: TransferHttpService
  ) { }

  getPost(id: string) {
    return this.transferHttp.get(`${urls.post}/${id}`);
  }

}
