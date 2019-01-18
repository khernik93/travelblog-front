import { of } from "rxjs";
import recentPostsResponse from '../responses/recentPosts';

export class RecentPostsStubs {

  static getRecentPostsService () {
    return jasmine.createSpyObj('RecentPostsService', {
      getRecentPosts: of(recentPostsResponse)
    });
  }

};
