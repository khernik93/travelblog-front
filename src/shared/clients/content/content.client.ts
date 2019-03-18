import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { ContentService } from './content.service';
import { Client } from '../client';
import { TransferHttpService } from '../../services/transferHttp.service';

@Injectable()
export class ContentClient {

  private client: Client;

  constructor(
    private contentService: ContentService,
    private transferHttpService: TransferHttpService
  ) {
    this.client = new Client(
      this.contentService,
      this.transferHttpService
    );
  }

  uploadFile(file: any): Observable<String> {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.client.sendPostRequest({
      uri: this.client.routes.uploadPhoto,
      payload: formData,
      params: {
        responseType: 'text',
        headers: {
          'Accept': 'application/json'
        }
      }
    });
  }

}
