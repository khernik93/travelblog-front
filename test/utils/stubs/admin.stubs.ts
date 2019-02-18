import { of } from "rxjs";
import { State } from "../state/state";
import { PostsService } from "../../../src/modules/admin/services/posts.service";

export class AdminStubs {

  static postId = State.content.singlePost.post.id.toString();

  static postsService(): jasmine.SpyObj<PostsService> {
    return jasmine.createSpyObj('PostsService', {
      transformPostIntoPostContentDTO: () => ({})
    });
  }

  static activatedRoute(): any {
    return {
      paramMap: of({ get: (paramName) => {
        switch (paramName) {
          case 'postId': {
            return AdminStubs.postId;
          }
        }
      }})
    };
  }

};
