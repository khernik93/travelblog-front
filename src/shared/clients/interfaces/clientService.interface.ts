import { HttpHeaders } from '@angular/common/http';

export interface ClientServiceI { 
  headers: HttpHeaders;
  routes: any;
  prepareUrl(uri: string): string;
  getAuthorizationHeader(): any;
}
