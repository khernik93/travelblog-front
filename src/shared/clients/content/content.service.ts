import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { ClientServiceI } from '../interfaces/clientService.interface';

export const ROUTES: any = {
  uploadPhoto: '/upload'
};

@Injectable()
export class ContentService implements ClientServiceI {

  headers: any;
  routes = ROUTES;

  private apiKeyHeader = 'X-Api-Key';
  private apiBasePath = '/resources';

  constructor() {
    this.initializeHeaders();
  }

  private initializeHeaders() {
    this.headers = { [this.apiKeyHeader]: CONTENT_KEY };
  }

  prepareUrl(uri: string) {
    return this.apiBasePath + uri;
  }

  getAuthorizationHeader(): any { }

}
