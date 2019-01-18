import { TestBed } from '@angular/core/testing';

import { TransferHttpService } from '../../../../../src/shared/services/transferHttp.service';
import { PostsListService } from '../../../../../src/modules/content/components/postsList/postsList.service';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';

describe('PostsListService', () => {

  let postsListService: PostsListService;
  let transferHttpService: jasmine.SpyObj<TransferHttpService>;

  beforeEach(() => {

    transferHttpService = SharedStubs.getTransferHttpService();

    TestBed.configureTestingModule({
      providers: [
        PostsListService,
        { provide: TransferHttpService, useValue: transferHttpService }
      ]
    });

  });

  beforeEach(() => {
    postsListService = TestBed.get(PostsListService);
  });

  it(`
    WHEN there is a call to getPosts method
    THEN transferHttpService.get method should be called
  `, () => {
    const tabName = 'sample_tab';
    postsListService.getPosts(tabName);
    expect(transferHttpService.get).toHaveBeenCalled();
  });

});
