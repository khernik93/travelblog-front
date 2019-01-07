import { Injectable } from '@angular/core';

import { TransferHttp } from '../../shared/transfer-http/transfer-http';

const urls = {
  posts: '/posts'
};

@Injectable()
export class PostsService {

  constructor(
    private transferHttp: TransferHttp
  ) { }

  getPosts(tab: string) {
    return this.transferHttp.get(urls.posts, {
      params: {tab}
    });
  }

}
