import { Injectable } from '@angular/core';

import { ApiClient } from '../../../../shared/clients/api.client';

@Injectable()
export class MenuService {

  constructor(
    private apiClient: ApiClient
  ) { }

  getTabs() {
    return this.apiClient.getTabs();
  }

}
