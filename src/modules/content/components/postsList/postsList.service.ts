import { Injectable } from '@angular/core';

import { TransferHttpService } from '../../../../shared/services/transfer-http.service';

const urls = {
  posts: '/posts'
};

@Injectable()
export class PostsListService {

  constructor(
    private transferHttp: TransferHttpService
  ) { }

  getPosts(tab: string) {
    return this.transferHttp.get(urls.posts, {
      params: {tab}
    });
  }

}
