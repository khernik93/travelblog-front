import { of } from 'rxjs';

import { MockStore } from '../mocks/mockStore';
import { PhotosResponse } from '../responses/photos.response';
import { TabsResponse } from '../responses/tabs.response';
import { SinglePostResponse } from '../responses/singlePost.response';
import { PostsListResponse } from '../responses/postsList.response';
import { RecentPostsResponse } from '../responses/recentPosts.response';
import { ApiClient } from '../../../src/shared/clients/api/api.client';
import { CommentsResponse } from '../responses/comments.response';

export class SharedStubs {

  static getApiClientStub(): jasmine.SpyObj<ApiClient> {
    return jasmine.createSpyObj('ApiClient', {
      'getRecentPosts': of(RecentPostsResponse),
      'getPosts': of(PostsListResponse),
      'getPost': of(SinglePostResponse),
      'getTabs': of(TabsResponse),
      'getPhotos': of(PhotosResponse),
      'getComments': of(CommentsResponse),
      'addNewPost': of(''),
      'updatePost': of(''),
      'addComment': of(''),
      'signIn': of('')
    });
  }

  static getMockStoreStub<T>(): MockStore<T> {
    return new MockStore<T>();
  }

  static getWysiwygServiceStub() {
    return jasmine.createSpyObj('WysiwygService', ['config']);
  }

  static getPreviousRouteServiceStub() {
    return jasmine.createSpyObj('PreviousRouteService', ['goBack']);
  }

};
