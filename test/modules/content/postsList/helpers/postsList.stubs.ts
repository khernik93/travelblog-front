import { Store } from '@ngrx/store';
import { ContentState } from '../../../../../src/modules/content/store/content.reducers';
import { of } from 'rxjs';
import { PostsListService } from '../../../../../src/modules/content/components/postsList/postsList.service';

export class PostsListStubs {

  static getPostsListServiceStub(): jasmine.SpyObj<PostsListService> {
    const spy = jasmine.createSpyObj('PostsListService', {
      getNextStart: 0,
      getNextEnd: 2
    });
    spy.DEFAULT_START = 0;
    spy.DEFAULT_END = 4;
    spy.SCROLL_DEBOUNCE = 200;
    return spy;
  }

};
