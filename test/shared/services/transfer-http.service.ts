import { TransferHttpService } from '../../../src/shared/services/transfer-http.service';
import { HttpClient } from '@angular/common/http';

describe('Transfer-http service', () => {

  let transferHttpService: TransferHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    transferHttpService = new TransferHttpService(<any> httpClientSpy);
  });

  it('get should execute', () => {
    transferHttpService.get('sampleurl');
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

});
