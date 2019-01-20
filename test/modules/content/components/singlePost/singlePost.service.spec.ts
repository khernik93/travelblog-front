import { TestBed } from '@angular/core/testing';

import { SinglePostService } from '../../../../../src/modules/content/components/SinglePost/SinglePost.service';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { ApiClient } from '../../../../../src/modules/app/clients/api.client';

describe('SinglePostService', () => {

  let singlePostService: SinglePostService;
  let apiClient: jasmine.SpyObj<ApiClient>;

  beforeEach(() => {

    apiClient = SharedStubs.getApiClientStub();

    TestBed.configureTestingModule({
      providers: [
        SinglePostService,
        { provide: ApiClient, useValue: apiClient }
      ]
    });

  });

  beforeEach(() => {
    singlePostService = TestBed.get(SinglePostService);
  });

  it(`
    WHEN there is a call to getPost method
    THEN transferHttpService.get method should be called
  `, () => {
    const id = '123';
    singlePostService.getPost(id);
    expect(apiClient.getPost).toHaveBeenCalled();
  });

});
