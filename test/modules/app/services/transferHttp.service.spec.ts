import { TransferHttpService } from '../../../../src/modules/app/services/transferHttp.service';
import { HttpClient } from '@angular/common/http';

describe('TransferHttp service', () => {

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
