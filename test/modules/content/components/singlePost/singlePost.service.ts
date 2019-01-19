import { TestBed } from '@angular/core/testing';

import { TransferHttpService } from '../../../../../src/shared/services/transferHttp.service';
import { SinglePostService } from '../../../../../src/modules/content/components/SinglePost/SinglePost.service';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';

describe('SinglePostService', () => {

  let singlePostService: SinglePostService;
  let transferHttpService: jasmine.SpyObj<TransferHttpService>;

  beforeEach(() => {

    transferHttpService = SharedStubs.getTransferHttpService();

    TestBed.configureTestingModule({
      providers: [
        SinglePostService,
        { provide: TransferHttpService, useValue: transferHttpService }
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
    expect(transferHttpService.get).toHaveBeenCalled();
  });

});
