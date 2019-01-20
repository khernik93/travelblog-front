import { Injectable } from '@angular/core';

import { ApiClient } from '../../../../shared/clients/api.client';

@Injectable()
export class SwiperService {

  constructor(
    private apiClient: ApiClient
  ) { }

  getPhotos() {
    return this.apiClient.getPhotos();
  }

}
