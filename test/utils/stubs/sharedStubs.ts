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
    return jasmine.createSpyObj('ApiClient', {
      'getRecentPosts': of({ error: '', data: RecentPostsResponse }),
      'getPosts': of({ error: '', data: PostsListResponse }),
      'getPost': of({ error: '', data: SinglePostResponse }),
      'getTabs': of({ error: '', data: TabsResponse }),
      'getPhotos': of({ error: '', data: PhotosResponse }),
      'signIn': of({error: '', data: ''})
    });
  }

  static getMockStoreStub<T>(): MockStore<T> {
    return new MockStore<T>();
  }

};
