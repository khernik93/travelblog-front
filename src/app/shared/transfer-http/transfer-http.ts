/* tslint:disable: max-line-length no-shadowed-variable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class TransferHttp {
  constructor(private httpClient: HttpClient) {
  }

  public request(method: string, uri: string | Request, options?: {
    body?: any;
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    reportProgress?: boolean;
    observe?: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.getData(method, uri, options, (method: string, url: string, options: any) => {
      return this.httpClient.request(method, url, options);
    });
  }

  /**
   * Performs a request with `get` http method.
   */
  get(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.getData('get', url, options, (method: string, url: string, options: any) => {
      return this.httpClient.get(url, options);
    });
  }

  // tslint:disable-next-line:max-line-length
  private getData(method: string,
                  uri: string | Request,
                  options: any,
                  callback: (method: string, uri: string | Request, options: any) => Observable<any>) {

    let url = environment.baseUrl + uri;

    if (typeof uri !== 'string') {
      url = uri.url;
    }

    const key = url + (options ? JSON.stringify(options) : '');

    return callback(method, url, options);
  }

}
