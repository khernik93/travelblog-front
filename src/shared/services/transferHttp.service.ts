import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

type Options = {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  responseType?: 'json';
  withCredentials?: boolean;
};

@Injectable()
export class TransferHttpService {

  constructor(
    private httpClient: HttpClient
    ) { }

  /**
   * Performs a request with `get` http method.
   */
  get(url: string, options?: Options): Observable<any> {    
    return this.httpClient.get(url, options);
  }

  /**
   * Performs a request with `post` http method.
   */
  post(url: string, body: any, options?: Options): Observable<any> {
    return this.httpClient.post(url, body, options);
  }

  /**
   * Performs a request with `put` http method.
   */
  put(url: string, body: any, options?: Options): Observable<any> {
    return this.httpClient.put(url, body, options);
  }

}
