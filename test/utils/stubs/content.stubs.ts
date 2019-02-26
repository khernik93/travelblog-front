import { of } from 'rxjs';
import { CommentsService } from '../../../src/modules/content/containers/comments/comments.service';
import { PostsListService } from '../../../src/modules/content/containers/postsList/postsList.service';

export class ContentStubs {

  static postId: string = '1';

  static commentsService(): jasmine.SpyObj<CommentsService> {
    return jasmine.createSpyObj('CommentsService', ['removeEmptyValues']);
  }

  static postsListService(): jasmine.SpyObj<PostsListService> {
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

  static activatedRoute() {
    return {
      paramMap: of({get: () => ContentStubs.postId})
    };
  }

}
