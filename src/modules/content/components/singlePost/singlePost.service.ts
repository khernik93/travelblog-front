import { Injectable } from '@angular/core';

import { ApiClient } from '../../../../shared/clients/api.client';

@Injectable()
export class SinglePostService {

  constructor(
    private apiClient: ApiClient
  ) { }

  getPost(id: string) {
    return this.apiClient.getPost(id);
  }

}
