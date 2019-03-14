import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TransferHttpService {

  constructor(
    private httpClient: HttpClient
    ) { }

  /**
   * Performs a request with `get` http method.
   */
  get(url: string, options?: any): Observable<any> {    
    return this.httpClient.get(url, options);
  }

  /**
   * Performs a request with `post` http method.
   */
  post(url: string, body: any, options?: any): Observable<any> {
    return this.httpClient.post(url, body, options);
  }

  /**
   * Performs a request with `put` http method.
   */
  put(url: string, body: any, options?: any): Observable<any> {
    return this.httpClient.put(url, body, options);
  }

  /**
   * Performs a request with `delete` http method.
   */
  delete(url: string, options?: any): Observable<any> {
    return this.httpClient.delete(url, options);
  }

}
