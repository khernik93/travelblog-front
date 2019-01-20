import { Injectable } from '@angular/core';

import { ApiClient } from '../../../app/clients/api.client';

@Injectable()
export class RecentPostsService {

  constructor(
    private apiClient: ApiClient
  ) { }

  getRecentPosts() {
    return this.apiClient.getRecentPosts();
  }

}
