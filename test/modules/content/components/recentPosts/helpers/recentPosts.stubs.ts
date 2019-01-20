import { of } from "rxjs";
import recentPostsResponse from '../../../../../utils/responses/recentPosts.response';

export class RecentPostsStubs {

  static getRecentPostsService () {
    return jasmine.createSpyObj('RecentPostsService', {
      getRecentPosts: of(recentPostsResponse)
    });
  }

};
