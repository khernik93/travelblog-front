import { PostsListService } from '../../../../../src/modules/content/components/postsList/postsList.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TabsResponse } from '../../../../utils/responses/tabs.response';

export class PostsListStubs {

  static selectedTab = TabsResponse[1].id;

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

  static getActivatedRouteStub(): any {
    return {
      paramMap: of({ get: (paramName) => PostsListStubs.selectedTab })
    };
  }

};
