export class SharedStubs {

  static getApiClientStub () {
    return jasmine.createSpyObj('ApiClient', [
      'getRecentPosts',
      'getPosts',
      'getPost',
      'getTabs',
      'getPhotos'
    ]);
  }

};
