import { Injectable } from '@angular/core';

import { TransferHttpService } from '../../../../shared/services/transferHttp.service';

const urls = {
  recentPosts: '/recentPosts'
};

@Injectable()
export class RecentPostsService {

  constructor(
    private transferHttp: TransferHttpService
  ) { }

  getRecentPosts() {
    return this.transferHttp.get(urls.recentPosts);
  }

}
