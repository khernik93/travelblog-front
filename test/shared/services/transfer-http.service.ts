import { TransferHttpService } from '../../../src/shared/services/transfer-http.service';

describe('Transfer-http service', () => {

  let transferHttpService: TransferHttpService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    transferHttpService = new TransferHttpService(<any> httpClientSpy);
  });

  it('get should execute', () => {
    transferHttpService.get('sampleurl');
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

});
