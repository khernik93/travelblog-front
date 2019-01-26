import { of } from 'rxjs';

import { MockStore } from '../mocks/mockStore';
import { PhotosResponse } from '../responses/photos.response';
import { TabsResponse } from '../responses/tabs.response';
import { SinglePostResponse } from '../responses/singlePost.response';
import { PostsListResponse } from '../responses/postsList.response';
import { RecentPostsResponse } from '../responses/recentPosts.response';
import { ApiClient } from '../../../src/shared/clients/api.client';

export class SharedStubs {

  static getApiClientStub(): jasmine.SpyObj<ApiClient> {
    const wrapResponse = (data: any): {error: string, data: any} => ({ error: '', data });
    return jasmine.createSpyObj('ApiClient', {
      'getRecentPosts': of(wrapResponse(RecentPostsResponse)),
      'getPosts': of(wrapResponse(PostsListResponse)),
      'getPost': of(wrapResponse(SinglePostResponse)),
      'getTabs': of(wrapResponse(TabsResponse)),
      'getPhotos': of(wrapResponse(PhotosResponse)),
      'addNewPost': of(wrapResponse('')),
      'signIn': of(wrapResponse(''))
    });
  }

  static getMockStoreStub<T>(): MockStore<T> {
    return new MockStore<T>();
  }

};
