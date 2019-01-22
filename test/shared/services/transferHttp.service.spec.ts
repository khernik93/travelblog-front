import { TransferHttpService } from '../../../src/shared/services/transferHttp.service';
import { HttpClient } from '@angular/common/http';

const SAMPLE_ROUTE = 'sampleurl';
const SAMPLE_BODY = { aaa: 'bbb' };

describe('TransferHttp service', () => {

  let transferHttpService: TransferHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    transferHttpService = new TransferHttpService(<any> httpClientSpy);
  });

  it(`
    WHEN a get method is called
    THEN HttpClient.get should be executed
  `, () => {
    transferHttpService.get(SAMPLE_ROUTE);
    expect(httpClientSpy.get).toHaveBeenCalledWith(SAMPLE_ROUTE, undefined);
  });

  it(`
    WHEN a post method is called
    THEN HttpClient.post should be executed
  `, () => {
    transferHttpService.post(SAMPLE_ROUTE, SAMPLE_BODY);
    expect(httpClientSpy.post).toHaveBeenCalledWith(SAMPLE_ROUTE, SAMPLE_BODY, undefined);
  });

});
