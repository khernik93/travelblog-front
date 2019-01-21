import { MockStore } from '../mocks/mockStore';

export class SharedStubs {

  static getApiClientStub() {
    return jasmine.createSpyObj('ApiClient', [
      'getRecentPosts',
      'getPosts',
      'getPost',
      'getTabs',
      'getPhotos'
    ]);
  }

  static getMockStoreStub<T>() {
    return new MockStore<T>();
  }

};
