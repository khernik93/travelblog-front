import { PostsListService } from '../../../../../src/modules/content/components/postsList/postsList.service';

export class PostsListStubs {

  static getPostsListServiceStub(): jasmine.SpyObj<PostsListService> {
    const start = 0, end = 2;
    const spy = jasmine.createSpyObj('PostsListService', {
      getNextStart: start,
      getNextEnd: end
    });
    spy.DEFAULT_START = start;
    spy.DEFAULT_END = end;
    spy.SCROLL_DEBOUNCE = 200;
    return spy;
  }

};
