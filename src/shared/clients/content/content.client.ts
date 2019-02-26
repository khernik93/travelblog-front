import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { TransferHttpService } from '../../services/transferHttp.service';

const ROUTES: any = {
  uploadPhoto: '/upload'
};

@Injectable()
export class ContentClient {

  private headers: HttpHeaders;

  constructor(
    private transferHttpService: TransferHttpService
  ) { 
    this.initializeHeaders();
  }

  private initializeHeaders() {
    this.headers = new HttpHeaders()
      .set('X-Api-Key', CONTENT_KEY);
  }

  uploadFile(file: any): Observable<String> {
    const url = this.prepareUrl(ROUTES.uploadPhoto);
    let formData:FormData = new FormData();
    formData.append('file', file, file.name);
    this.headers.append('Content-Type', 'multipart/form-data');
    this.headers.append('Accept', 'application/json');
    return this.transferHttpService.post(url, formData, {
      headers: this.headers,
      responseType: 'text'
    });
  }

  /**
   * Build absolute URL based on a path
   * @param uri 
   */
  private prepareUrl(uri: string) {
    return '/resources' + uri;
  }

}
