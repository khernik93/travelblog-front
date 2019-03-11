import { of } from 'rxjs';
import { Router } from '@angular/router';

import { MockStore } from '../mocks/mockStore';
import { PhotosResponse } from '../responses/photos.response';
import { TabsResponse } from '../responses/tabs.response';
import { SinglePostResponse } from '../responses/singlePost.response';
import { PostsListResponse } from '../responses/postsList.response';
import { RecentPostsResponse } from '../responses/recentPosts.response';
import { ApiClient } from '../../../src/shared/clients/api/api.client';
import { CommentsResponse } from '../responses/comments.response';
import { ContentClient } from '../../../src/shared/clients/content/content.client';

export class SharedStubs {

  static router(): jasmine.SpyObj<Router> {
    return jasmine.createSpyObj('Router', ['navigateByUrl']);
  }

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
      'deletePost': of(''),
      'addComment': of(''),
      'signIn': of('')
    });
  }

  static getContentClientStub(): jasmine.SpyObj<ContentClient> {
    return jasmine.createSpyObj('ContentClient', {
      'uploadPhoto': of('')
    });
  }

  static getMockStoreStub<T>(): MockStore<T> {
    return new MockStore<T>();
  }

  static getPreviousRouteServiceStub() {
    return jasmine.createSpyObj('PreviousRouteService', ['goBack']);
  }

}
