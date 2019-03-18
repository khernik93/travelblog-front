import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { TransferHttpService } from '../services/transferHttp.service';
import { ClientServiceI } from './interfaces/clientService.interface';

interface HttpRequest {
  uri: string,
  params?: any,
  payload?: any,
  secured?: boolean
};

export class Client {

  public routes = this.clientService.routes;

  constructor(
    private clientService: ClientServiceI,
    private transferHttpService: TransferHttpService
  ) { }

  public sendGetRequest(request: HttpRequest): Observable<any> {
    this.prepareRequest(request);
    return this.transferHttpService.get(request.uri, request.params);
  }

  public sendPostRequest(request: HttpRequest): Observable<any> {
    this.prepareRequest(request);
    return this.transferHttpService.post(request.uri, request.payload, request.params);
  }

  public sendPutRequest(request: HttpRequest): Observable<any> {
    this.prepareRequest(request);
    return this.transferHttpService.put(request.uri, request.payload, request.params);
  }

  public sendDeleteRequest(request: HttpRequest): Observable<any> {
    this.prepareRequest(request);
    return this.transferHttpService.delete(request.uri, request.params);
  }

  private prepareRequest(request: HttpRequest): void {
    request.uri = this.clientService.prepareUrl(request.uri);

    // Append all additional headers
    let headers: HttpHeaders = this.clientService.headers;
    if (request.secured === true) {
      headers = Object.assign(headers, this.clientService.getAuthorizationHeader());
    }
    request.params = request.params || {};
    request.params.headers = { ...request.params.headers, ...headers };
  }

}
