import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TransferHttpService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Performs a request with `get` http method.
   */
  get(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    url = this.prepareUrl(url);
    return this.httpClient.get(url, options);
  }

  private prepareUrl(uri: string): string {
    return environment.baseUrl + uri;
  }

}
