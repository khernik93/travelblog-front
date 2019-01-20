import { Injectable } from '@angular/core';

import { ApiClient } from '../../../../shared/clients/api.client';

@Injectable()
export class RecentPostsService {

  constructor(
    private apiClient: ApiClient
  ) { }

  getRecentPosts() {
    return this.apiClient.getRecentPosts();
  }

}
