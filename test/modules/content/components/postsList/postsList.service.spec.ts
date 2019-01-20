import { TestBed } from '@angular/core/testing';

import { PostsListService } from '../../../../../src/modules/content/components/postsList/postsList.service';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { ApiClient } from '../../../../../src/modules/app/clients/api.client';

describe('PostsListService', () => {

  let postsListService: PostsListService;
  let apiClient: jasmine.SpyObj<ApiClient>;

  beforeEach(() => {

    apiClient = SharedStubs.getApiClientStub();

    TestBed.configureTestingModule({
      providers: [
        PostsListService,
        { provide: ApiClient, useValue: apiClient }
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
    expect(apiClient.getPosts).toHaveBeenCalled();
  });

});
