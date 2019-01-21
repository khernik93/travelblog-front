import { Injectable } from '@angular/core';

import { ApiClient } from '../../../../shared/clients/api.client';

@Injectable()
export class PostsListService {

  constructor(
    private apiClient: ApiClient
  ) { }

  getPosts(tab: string) {
    return this.apiClient.getPosts(tab);
  }

}
