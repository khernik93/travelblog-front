import { of } from "rxjs";
import postsListResponse from '../../../../../utils/responses/postsList.response';

export class PostsListStubs {

  static getPostsListService () {
    return jasmine.createSpyObj('PostsListService', {
      getPosts: of(postsListResponse)
    });
  }

};
