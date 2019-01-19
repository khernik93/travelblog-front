import { of } from "rxjs";
import postsListResponse from '../responses/postsList';

export class PostsListStubs {

  static getPostsListService () {
    return jasmine.createSpyObj('PostsListService', {
      getPosts: of(postsListResponse)
    });
  }

};
